import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { logger } from "@/lib/logger";
import GlobalError from "./global-error";

jest.mock("@/lib/logger", () => ({
  logger: { error: jest.fn(), warn: jest.fn(), info: jest.fn() },
}));

describe("GlobalError (global-error.tsx)", () => {
  it("logs the error with its digest on mount", () => {
    const error = Object.assign(new Error("root layout boom"), {
      digest: "xyz789",
    });
    render(<GlobalError error={error} reset={jest.fn()} />);

    expect(logger.error).toHaveBeenCalledWith(
      "Unhandled root layout error",
      error,
      { digest: "xyz789" },
    );
  });

  it("renders without throwing and calls reset() when clicked", async () => {
    const user = userEvent.setup();
    const reset = jest.fn();

    expect(() =>
      render(<GlobalError error={new Error("boom")} reset={reset} />),
    ).not.toThrow();

    expect(
      screen.getByRole("heading", { name: "Something went wrong" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
