import { render, waitFor } from "@testing-library/react";
import toast from "react-hot-toast";
import GitHubCallbackPage from "./page";

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

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: (...args: unknown[]) => pushMock(...args),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => "/auth/github/callback",
  useSearchParams: () => new URLSearchParams(),
}));

describe("GitHubCallbackPage", () => {
  it("redirects to login because social auth is not implemented", async () => {
    toastFn.error.mockClear();
    pushMock.mockClear();
    render(<GitHubCallbackPage />);
    await waitFor(() =>
      expect(toastFn.error).toHaveBeenCalledWith(
        "Social sign-in is not available. Use email and password.",
      ),
    );
    expect(pushMock).toHaveBeenCalledWith("/login");
  });
});
