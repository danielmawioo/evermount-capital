import { render, screen } from "@testing-library/react";
import TechnologySection from "./TechnologySection";

describe("TechnologySection", () => {
  it("renders the heading and body copy", () => {
    render(<TechnologySection />);

    expect(
      screen.getByRole("heading", { name: "Technology & Innovation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/At the heart of Evermount Capital/),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Our technology stack includes:"),
    ).toBeInTheDocument();
  });

  it("renders the technology stack list items", () => {
    render(<TechnologySection />);

    expect(
      screen.getByText(
        "Machine learning models trained on historical market data",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Systematic, low-latency electronic trading infrastructure",
      ),
    ).toBeInTheDocument();
  });

  it("renders a link to learn more about the platform", () => {
    render(<TechnologySection />);

    const link = screen.getByRole("link", {
      name: /Learn More About Our Platform/,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/platform");
  });
});
