import { renderHook, act, waitFor } from "@testing-library/react";
import { useChatWidget } from "./useChatWidget";

function mockFetchOnce(response: Partial<Response> & { jsonBody: unknown }) {
  const { jsonBody, ok = true, status = 200 } = response;
  return jest.fn().mockResolvedValueOnce({
    ok,
    status,
    json: () => Promise.resolve(jsonBody),
  } as Response);
}

describe("useChatWidget", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = originalFetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("starts closed with no department selected and no messages", () => {
    const { result } = renderHook(() => useChatWidget());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.selectedDepartment).toBeNull();
    expect(result.current.messages).toEqual([]);
    expect(result.current.activeDepartment).toBeUndefined();
    expect(result.current.assistantName).toBe("Ethan");
  });

  it("selecting a department sets it as active and seeds a welcome message", () => {
    const { result } = renderHook(() => useChatWidget());

    act(() => {
      result.current.handleDepartmentSelect("technical");
    });

    expect(result.current.selectedDepartment).toBe("technical");
    expect(result.current.activeDepartment?.name).toBe("Technical Support");
    expect(result.current.assistantName).toBe("Ethan");
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].isWelcome).toBe(true);
    expect(result.current.messages[0].content).toContain(
      "Hello! I'm Ethan from Technical Support"
    );
  });

  it("sendMessage posts to /api/chat with the conversation history and department", async () => {
    global.fetch = mockFetchOnce({
      jsonBody: { message: "Try clearing your cache.", links: [], needsHumanSupport: false },
    });
    const { result } = renderHook(() => useChatWidget());

    act(() => {
      result.current.handleDepartmentSelect("technical");
    });

    await act(async () => {
      await result.current.sendMessage("The dashboard is blank");
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/chat",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
    const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    expect(body.department).toBe("technical");
    expect(body.assistantName).toBe("Ethan");
    // The canned welcome message is excluded from the outgoing history.
    expect(body.messages).toEqual([
      { role: "user", content: "The dashboard is blank" },
    ]);

    expect(result.current.loading).toBe(false);
    expect(result.current.input).toBe("");
    const lastMessage = result.current.messages[result.current.messages.length - 1];
    expect(lastMessage.content).toBe("Try clearing your cache.");
    expect(lastMessage.role).toBe("assistant");
  });

  it("sets loading true while a request is in flight and false once resolved", async () => {
    let resolveFetch: (value: unknown) => void = () => {};
    global.fetch = jest.fn().mockReturnValueOnce(
      new Promise((resolve) => {
        resolveFetch = resolve;
      })
    );
    const { result } = renderHook(() => useChatWidget());

    act(() => {
      result.current.handleDepartmentSelect("technical");
    });

    act(() => {
      void result.current.sendMessage("Hello");
    });

    await waitFor(() => expect(result.current.loading).toBe(true));

    await act(async () => {
      resolveFetch({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ message: "Done" }),
      });
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(
      result.current.messages.some((m) => m.content === "Done")
    ).toBe(true);
  });

  it("falls back to an error message when the chat request throws", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("network down"));
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const { result } = renderHook(() => useChatWidget());

    act(() => {
      result.current.handleDepartmentSelect("technical");
    });

    await act(async () => {
      await result.current.sendMessage("Anything");
    });

    const lastMessage = result.current.messages[result.current.messages.length - 1];
    expect(lastMessage.content).toMatch(/experiencing technical difficulties/);
    consoleErrorSpy.mockRestore();
  });

  it("does not send a message when no department is selected", async () => {
    global.fetch = jest.fn();
    const { result } = renderHook(() => useChatWidget());

    await act(async () => {
      await result.current.sendMessage("Hello");
    });

    expect(global.fetch).not.toHaveBeenCalled();
    expect(result.current.messages).toEqual([]);
  });

  it("does not send a blank message", async () => {
    global.fetch = jest.fn();
    const { result } = renderHook(() => useChatWidget());

    act(() => {
      result.current.handleDepartmentSelect("technical");
    });

    await act(async () => {
      await result.current.sendMessage("   ");
    });

    expect(global.fetch).not.toHaveBeenCalled();
    // Only the welcome message remains.
    expect(result.current.messages).toHaveLength(1);
  });

  it("resets department, messages, and input when closed", () => {
    const { result } = renderHook(() => useChatWidget());

    act(() => {
      result.current.setIsOpen(true);
    });
    act(() => {
      result.current.handleDepartmentSelect("technical");
    });
    act(() => {
      result.current.setInput("draft text");
    });

    expect(result.current.selectedDepartment).toBe("technical");
    expect(result.current.input).toBe("draft text");

    act(() => {
      result.current.setIsOpen(false);
    });

    expect(result.current.selectedDepartment).toBeNull();
    expect(result.current.messages).toEqual([]);
    expect(result.current.input).toBe("");
  });

  it("showSuggestedPrompts is true only right after the welcome message, not once a reply arrives", async () => {
    global.fetch = mockFetchOnce({ jsonBody: { message: "Here you go." } });
    const { result } = renderHook(() => useChatWidget());

    act(() => {
      result.current.handleDepartmentSelect("technical");
    });
    expect(result.current.showSuggestedPrompts).toBe(true);

    await act(async () => {
      await result.current.sendMessage("A question");
    });

    expect(result.current.showSuggestedPrompts).toBe(false);
  });
});
