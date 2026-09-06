import { redirect } from "next/navigation";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

import InvestorTourPage from "./page";

describe("InvestorTourPage", () => {
  it("redirects to /platform-tour", () => {
    InvestorTourPage();
    expect(redirect).toHaveBeenCalledWith("/platform-tour");
  });
});
