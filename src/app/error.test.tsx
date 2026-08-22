import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { logger } from "@/lib/logger";
import ErrorBoundary from "./error";

jest.mock("@/lib/logger", () => ({
  logger: { error: jest.fn(), warn: jest.fn(), info: jest.fn() },
}));

describe("ErrorBoundary (error.tsx)", () => {
  it("logs the error with its digest on mount", () => {
    const error = Object.assign(new Error("boom"), { digest: "abc123" });
    const reset = jest.fn();

    render(<ErrorBoundary error={error} reset={reset} />);

    expect(logger.error).toHaveBeenCalledWith("Unhandled render error", error, {
      digest: "abc123",
    });
  });

  it("renders a heading and calls reset() when 'Try again' is clicked", async () => {
    const user = userEvent.setup();
    const reset = jest.fn();

    render(<ErrorBoundary error={new Error("boom")} reset={reset} />);

    expect(
      screen.getByRole("heading", { name: "Something went wrong" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("links back to the homepage", () => {
    render(<ErrorBoundary error={new Error("boom")} reset={jest.fn()} />);
    expect(screen.getByRole("link", { name: "Go to Home" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
