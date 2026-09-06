import { redirect } from "next/navigation";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

import PortfolioInsightsPage from "./page";

describe("PortfolioInsightsPage", () => {
  it("redirects to /analytics", () => {
    PortfolioInsightsPage();
    expect(redirect).toHaveBeenCalledWith("/analytics");
  });
});
