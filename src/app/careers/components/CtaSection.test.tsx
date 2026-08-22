import { render, screen } from "@testing-library/react";
import CtaSection from "./CtaSection";

describe("CtaSection", () => {
  it("renders the heading, copy and mailto link", () => {
    render(<CtaSection />);

    expect(
      screen.getByRole("heading", { name: "Don't see a role for you?" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We're always looking for passionate people/),
    ).toBeInTheDocument();

    const link = screen.getByRole("link", {
      name: "Email Us: careers@evermount.co",
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "mailto:careers@evermount.co");
  });
});
