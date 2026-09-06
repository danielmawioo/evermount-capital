import { redirect } from "next/navigation";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

import InvestmentAgreementPage from "./page";

describe("InvestmentAgreementPage", () => {
  it("redirects to /terms", () => {
    InvestmentAgreementPage();
    expect(redirect).toHaveBeenCalledWith("/terms");
  });
});
