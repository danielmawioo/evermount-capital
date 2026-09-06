import { render, screen } from "@testing-library/react";
import CareersPage from "./page";

describe("CareersPage", () => {
  it("renders without crashing and shows the main heading", () => {
    render(<CareersPage />);
    expect(
      screen.getByRole("heading", {
        name: /Build the Infrastructure Behind Modern Financial Markets/i,
      }),
    ).toBeInTheDocument();
  });

  it("does not list fabricated job postings", () => {
    render(<CareersPage />);
    expect(
      screen.getByText(/No open roles are currently listed/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /frontend engineer/i }),
    ).not.toBeInTheDocument();
  });

  it("provides a mailto CTA for candidates without a matching open role", () => {
    render(<CareersPage />);
    const emailCta = screen.getByRole("link", {
      name: /email us: careers@evermount.co/i,
    });
    expect(emailCta).toHaveAttribute("href", "mailto:careers@evermount.co");
  });
});
