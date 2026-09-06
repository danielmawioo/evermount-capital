import { render, screen } from "@testing-library/react";
import ExtendedHomeSections from "./ExtendedHomeSections";

describe("ExtendedHomeSections", () => {
  it("renders without throwing and shows key section headings", () => {
    render(<ExtendedHomeSections />);

    expect(
      screen.getByText(
        /Infrastructure for Institutions, Developers and Researchers/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Our Technology Philosophy"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("World-Class Research & Engineering Team"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Institutional-Grade Infrastructure & Risk Controls"),
    ).toBeInTheDocument();
  });

  it("renders leadership team members", () => {
    render(<ExtendedHomeSections />);

    expect(screen.getByText("Daniel Mawioo")).toBeInTheDocument();
    expect(
      screen.getByText("CEO, Co-Founder & Low-Latency Systems Engineer"),
    ).toBeInTheDocument();
    expect(screen.getByText("Evans Kipngetich")).toBeInTheDocument();
  });

  it("renders the closing CTA", () => {
    render(<ExtendedHomeSections />);

    expect(
      screen.getByRole("link", { name: "Explore Platform" }),
    ).toHaveAttribute("href", "/platform");
    expect(
      screen.getByRole("link", { name: "Become a Partner" }),
    ).toHaveAttribute("href", "/partners");
  });
});
