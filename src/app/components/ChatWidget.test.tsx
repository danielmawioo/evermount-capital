import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatWidget from "./ChatWidget";

// jsdom does not implement scrollIntoView; ChatWidget calls it whenever the
// message list changes.
beforeAll(() => {
  Element.prototype.scrollIntoView = jest.fn();
});

function mockFetchOnce(response: Partial<Response> & { jsonBody: unknown }) {
  const { jsonBody, ok = true, status = 200 } = response;
  return jest.fn().mockResolvedValueOnce({
    ok,
    status,
    json: () => Promise.resolve(jsonBody),
  } as Response);
}

describe("ChatWidget", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = originalFetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("is closed by default and opens when the launcher button is clicked", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    expect(
      screen.queryByText("Which department can help you today?"),
    ).not.toBeInTheDocument();

    await user.click(screen.getByLabelText("Open chat"));

    expect(
      screen.getByText("Which department can help you today?"),
    ).toBeInTheDocument();
    // All department options are listed before a department is selected.
    expect(screen.getByText("Technical Support")).toBeInTheDocument();
    expect(screen.getByText("Payments & Billing")).toBeInTheDocument();
  });

  it("shows a welcome message and suggested prompts after selecting a department", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(screen.getByLabelText("Open chat"));
    await user.click(screen.getByText("Technical Support"));

    expect(
      screen.getByText(/Hello! I'm Ethan from Technical Support/),
    ).toBeInTheDocument();
    expect(screen.getByText("Common questions:")).toBeInTheDocument();
    expect(
      screen.getByText("The dashboard won't load properly"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ask Technical Support..."),
    ).toBeInTheDocument();
  });

  it("sends a typed message and renders the assistant's response", async () => {
    global.fetch = mockFetchOnce({
      jsonBody: {
        message: "Try clearing your cache.",
        links: [],
        needsHumanSupport: false,
      },
    });
    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(screen.getByLabelText("Open chat"));
    await user.click(screen.getByText("Technical Support"));

    const input = screen.getByPlaceholderText("Ask Technical Support...");
    await user.type(input, "The dashboard is blank");
    await user.click(screen.getByLabelText("Send message"));

    expect(screen.getByText("The dashboard is blank")).toBeInTheDocument();

    expect(
      await screen.findByText("Try clearing your cache."),
    ).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/chat",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    );
    const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    expect(body.department).toBe("technical");
    expect(body.assistantName).toBe("Ethan");
    // The canned welcome message is excluded from the outgoing history.
    expect(body.messages).toEqual([
      { role: "user", content: "The dashboard is blank" },
    ]);
  });

  it("clicking a suggested prompt sends it as a message", async () => {
    global.fetch = mockFetchOnce({
      jsonBody: { message: "Here is how to fix it." },
    });
    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(screen.getByLabelText("Open chat"));
    await user.click(screen.getByText("Technical Support"));

    await user.click(screen.getByText("The dashboard won't load properly"));

    expect(
      await screen.findByText("Here is how to fix it."),
    ).toBeInTheDocument();
  });

  it("renders a Book a Demo link when the response needs human support", async () => {
    global.fetch = mockFetchOnce({
      jsonBody: {
        message: "Let's get you to a specialist.",
        needsHumanSupport: true,
      },
    });
    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(screen.getByLabelText("Open chat"));
    await user.click(screen.getByText("Technical Support"));

    const input = screen.getByPlaceholderText("Ask Technical Support...");
    await user.type(input, "I need a human");
    await user.click(screen.getByLabelText("Send message"));

    await screen.findByText("Let's get you to a specialist.");
    expect(
      screen.getByRole("link", { name: "Book a Demo with Our Team" }),
    ).toHaveAttribute("href", "/book-demo");
  });

  it("shows the fallback error message when the chat request throws", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("network down"));
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(screen.getByLabelText("Open chat"));
    await user.click(screen.getByText("Technical Support"));

    const input = screen.getByPlaceholderText("Ask Technical Support...");
    await user.type(input, "Anything");
    await user.click(screen.getByLabelText("Send message"));

    expect(
      await screen.findByText(/I'm experiencing technical difficulties/),
    ).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });

  it("renders links inside message text as clickable anchors", async () => {
    global.fetch = mockFetchOnce({
      jsonBody: {
        message: "See https://evermount.co/docs for more info.",
      },
    });
    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(screen.getByLabelText("Open chat"));
    await user.click(screen.getByText("Technical Support"));

    const input = screen.getByPlaceholderText("Ask Technical Support...");
    await user.type(input, "Where are the docs?");
    await user.click(screen.getByLabelText("Send message"));

    const link = await screen.findByRole("link", {
      name: "https://evermount.co/docs",
    });
    expect(link).toHaveAttribute("href", "https://evermount.co/docs");
  });

  it("allows navigating back to department selection and resets on close", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(screen.getByLabelText("Open chat"));
    await user.click(screen.getByText("Technical Support"));
    expect(
      screen.getByText(/Hello! I'm Ethan from Technical Support/),
    ).toBeInTheDocument();

    await user.click(screen.getByLabelText("Back to departments"));
    expect(
      screen.getByText("Which department can help you today?"),
    ).toBeInTheDocument();

    await user.click(screen.getByLabelText("Close chat"));

    await user.click(screen.getByLabelText("Open chat"));
    expect(
      screen.getByText("Which department can help you today?"),
    ).toBeInTheDocument();
  });

  it("disables the send button while input is empty or a request is in flight", async () => {
    let resolveFetch: (value: unknown) => void = () => {};
    global.fetch = jest.fn().mockReturnValueOnce(
      new Promise((resolve) => {
        resolveFetch = resolve;
      }),
    );
    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(screen.getByLabelText("Open chat"));
    await user.click(screen.getByText("Technical Support"));

    const sendButton = screen.getByLabelText("Send message");
    expect(sendButton).toBeDisabled();

    const input = screen.getByPlaceholderText("Ask Technical Support...");
    await user.type(input, "Hello");
    expect(sendButton).not.toBeDisabled();

    await user.click(sendButton);
    expect(sendButton).toBeDisabled();
    expect(input).toBeDisabled();

    resolveFetch({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ message: "Done" }),
    });

    await screen.findByText("Done");
  });
});
