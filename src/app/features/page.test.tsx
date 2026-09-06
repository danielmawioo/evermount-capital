import { redirect } from "next/navigation";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

import FeaturesPage from "./page";

describe("FeaturesPage", () => {
  it("redirects to /platform", () => {
    FeaturesPage();
    expect(redirect).toHaveBeenCalledWith("/platform");
  });
});
