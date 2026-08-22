import { render, screen } from "@testing-library/react";
import EmailVerificationPage from "./page";

// This page is currently a static form with no wired-up submit handler, no
// query-param handling, and no API calls (unlike reset-password, it never
// calls api.auth.verifyEmail). We only cover rendering/structure here.
describe("EmailVerificationPage", () => {
  it("renders the verification form with 6 code inputs and actions", () => {
    render(<EmailVerificationPage />);

    expect(
      screen.getByRole("heading", { name: /please check your email/i }),
    ).toBeInTheDocument();

    const codeInputs = screen
      .getAllByRole("textbox")
      .filter((el) => el.getAttribute("maxlength") === "1");
    expect(codeInputs).toHaveLength(6);

    expect(screen.getByRole("button", { name: /verify/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /resend/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /return to sign in/i }),
    ).toHaveAttribute("href", "/login");
  });
});
