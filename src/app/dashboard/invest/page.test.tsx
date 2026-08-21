import { render, screen } from "@testing-library/react";
import InvestRedirectPage from "./page";

const replace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace, back: jest.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("InvestRedirectPage", () => {
  beforeEach(() => {
    replace.mockClear();
  });

  it("redirects to the trade page", () => {
    render(<InvestRedirectPage />);

    expect(screen.getByText("Redirecting to Trade...")).toBeInTheDocument();
    expect(replace).toHaveBeenCalledWith("/dashboard/trade");
  });
});
