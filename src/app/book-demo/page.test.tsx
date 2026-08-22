import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import toast from "react-hot-toast";
import BookDemoPage from "./page";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: jest.fn(), back: jest.fn() }),
  usePathname: () => "/book-demo",
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock("react-hot-toast", () => {
  const fn = jest.fn() as jest.Mock & { success: jest.Mock; error: jest.Mock };
  fn.success = jest.fn();
  fn.error = jest.fn();
  return {
    __esModule: true,
    default: fn,
    Toaster: () => null,
  };
});

const toastFn = toast as unknown as jest.Mock & {
  success: jest.Mock;
  error: jest.Mock;
};

describe("BookDemoPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    push.mockClear();
    toastFn.mockClear();
    toastFn.success.mockClear();
    toastFn.error.mockClear();
    mock = new MockAdapter(apiClient);
    mock.onGet("/booked-demo-slots").reply(200, { bookedSlots: [] });
  });

  afterEach(() => {
    mock.restore();
  });

  it("renders the booking form with the main heading", async () => {
    render(<BookDemoPage />);

    expect(
      screen.getByRole("heading", { name: /book a demo/i }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /book demo/i }),
    ).toBeInTheDocument();

    // Fetches previously booked slots on mount so they can be excluded.
    await waitFor(() => {
      expect(mock.history.get?.length).toBe(1);
    });
  });

  it("shows validation errors and does not submit when required fields are missing", async () => {
    const { container } = render(<BookDemoPage />);

    await waitFor(() => expect(mock.history.get?.length).toBe(1));

    fireEvent.submit(container.querySelector("form")!);

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Valid email required")).toBeInTheDocument();
    expect(screen.getByText("Date & time required")).toBeInTheDocument();
    expect(mock.history.post?.length ?? 0).toBe(0);
  });

  it("closes and redirects home when the close button is clicked", async () => {
    const user = userEvent.setup();
    render(<BookDemoPage />);

    await waitFor(() => expect(mock.history.get?.length).toBe(1));

    const closeButton = screen.getAllByRole("button")[0];
    await user.click(closeButton);

    expect(push).toHaveBeenCalledWith("/");
    expect(
      screen.queryByRole("heading", { name: /book a demo/i }),
    ).not.toBeInTheDocument();
  });

  it("closes and redirects home when the Escape key is pressed", async () => {
    const user = userEvent.setup();
    render(<BookDemoPage />);

    await waitFor(() => expect(mock.history.get?.length).toBe(1));

    await user.keyboard("{Escape}");

    expect(push).toHaveBeenCalledWith("/");
  });

  it("closes and redirects home when clicking outside the modal", async () => {
    const user = userEvent.setup();
    render(<BookDemoPage />);

    await waitFor(() => expect(mock.history.get?.length).toBe(1));

    // The dark overlay behind the modal card is outside modalRef.
    await user.click(document.body);

    expect(push).toHaveBeenCalledWith("/");
  });

  it("logs an error without crashing when fetching booked slots fails", async () => {
    mock.reset();
    mock.onGet("/booked-demo-slots").reply(500);
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<BookDemoPage />);

    await waitFor(() => {
      expect(consoleError.mock.calls[0][0]).toMatchObject({
        level: "error",
        message: "Failed to fetch booked slots",
      });
    });

    consoleError.mockRestore();
  });

  it("submits the form, shows a success toast, and redirects home", async () => {
    jest.useFakeTimers({ legacyFakeTimers: false });
    try {
      const user = userEvent.setup({
        advanceTimers: (ms) => jest.advanceTimersByTime(ms),
      });

      mock.onPost("/demo-booking").reply(200, {});

      render(<BookDemoPage />);
      await waitFor(() => expect(mock.history.get?.length).toBe(1));

      await user.type(screen.getByPlaceholderText("Jane Doe"), "Jane Doe");
      await user.type(
        screen.getByPlaceholderText("you@example.com"),
        "jane@example.com",
      );
      await user.type(
        screen.getByPlaceholderText("Evermount Capital"),
        "Acme Corp",
      );
      await user.type(
        screen.getByPlaceholderText(/your message/i),
        "Interested in the platform",
      );

      await pickDateAndTime(user);

      await user.click(screen.getByRole("button", { name: /book demo/i }));

      await waitFor(() => {
        expect(mock.history.post?.length).toBe(1);
      });
      const body = JSON.parse(mock.history.post![0].data);
      expect(body).toMatchObject({
        fullName: "Jane Doe",
        email: "jane@example.com",
        company: "Acme Corp",
        message: "Interested in the platform",
      });

      await waitFor(() => {
        expect(toastFn.success).toHaveBeenCalledWith(
          "Demo booked successfully!",
        );
      });

      expect(
        await screen.findByRole("heading", {
          name: /demo booked successfully!/i,
        }),
      ).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(push).toHaveBeenCalledWith("/");
    } finally {
      jest.useRealTimers();
    }
  });

  it("shows an error toast when booking fails", async () => {
    mock.onPost("/demo-booking").reply(500, {
      error: { message: "Slot no longer available" },
    });

    const user = userEvent.setup();
    render(<BookDemoPage />);
    await waitFor(() => expect(mock.history.get?.length).toBe(1));

    await user.type(screen.getByPlaceholderText("Jane Doe"), "Jane Doe");
    await user.type(
      screen.getByPlaceholderText("you@example.com"),
      "jane@example.com",
    );
    await pickDateAndTime(user);

    await user.click(screen.getByRole("button", { name: /book demo/i }));

    await waitFor(() => {
      expect(toastFn.error).toHaveBeenCalledWith("Slot no longer available");
    });
  });
});

// The date picker only exposes a plain text input, so driving it means
// opening the calendar popup and clicking a real day cell + time slot
// rather than typing a formatted string directly.
async function pickDateAndTime(user: ReturnType<typeof userEvent.setup>) {
  const dateInput = screen.getByPlaceholderText(/select date & time/i);
  await user.click(dateInput);

  const enabledDay = screen.getAllByRole("option", { name: /^Choose /i })[0];
  await user.click(enabledDay);

  const enabledTime = screen.getByText("10:00 AM");
  await user.click(enabledTime);

  return dateInput as HTMLInputElement;
}
