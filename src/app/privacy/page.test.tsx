import { render, screen } from "@testing-library/react";
import PrivacyPolicyPage from "./page";

describe("PrivacyPolicyPage", () => {
  it("renders the privacy policy content", () => {
    render(<PrivacyPolicyPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Privacy Policy/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Effective Date:/i)).toBeInTheDocument();
  });
});
