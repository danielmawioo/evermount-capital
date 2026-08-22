import { render, screen, act, fireEvent } from "@testing-library/react";
import CookieConsent from "./CookieConsent";

describe("CookieConsent", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("shows the banner after a delay when no consent has been recorded", () => {
    render(<CookieConsent />);

    expect(screen.queryByText(/We use cookies/)).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByText(/We use cookies/)).toBeInTheDocument();
  });

  it("does not show the banner if the user already accepted", () => {
    localStorage.setItem("cookie-accepted", "true");
    render(<CookieConsent />);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.queryByText(/We use cookies/)).not.toBeInTheDocument();
  });

  it("does not show the banner if rejected recently, but shows again after expiry", () => {
    localStorage.setItem("cookie-rejected", Date.now().toString());
    render(<CookieConsent />);

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.queryByText(/We use cookies/)).not.toBeInTheDocument();
  });

  it("shows the banner again once the rejection has expired", () => {
    const twentyFiveHoursAgo = Date.now() - 25 * 60 * 60 * 1000;
    localStorage.setItem("cookie-rejected", twentyFiveHoursAgo.toString());
    render(<CookieConsent />);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByText(/We use cookies/)).toBeInTheDocument();
  });

  it("hides the banner and records acceptance when Accept is clicked", () => {
    render(<CookieConsent />);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    fireEvent.click(screen.getByRole("button", { name: "Accept" }));

    expect(screen.queryByText(/We use cookies/)).not.toBeInTheDocument();
    expect(localStorage.getItem("cookie-accepted")).toBe("true");
    expect(localStorage.getItem("cookie-rejected")).toBeNull();
  });

  it("hides the banner and records rejection when Reject is clicked", () => {
    render(<CookieConsent />);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    fireEvent.click(screen.getByRole("button", { name: "Reject" }));

    expect(screen.queryByText(/We use cookies/)).not.toBeInTheDocument();
    expect(localStorage.getItem("cookie-rejected")).not.toBeNull();
  });
});
