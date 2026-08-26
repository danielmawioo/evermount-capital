import { render, screen } from "@testing-library/react";
import CompanyStorySection from "./CompanyStorySection";

describe("CompanyStorySection", () => {
  it("renders the company overview heading, copy, and link", () => {
    render(<CompanyStorySection />);

    expect(screen.getByText("About Evermount")).toBeInTheDocument();
    expect(
      screen.getByText("Quantitative Trading Technology Built for Africa"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Learn More About Us/ }),
    ).toHaveAttribute("href", "/about");
  });

  it("renders the investment philosophy heading and all principles", () => {
    render(<CompanyStorySection />);

    expect(screen.getByText("Our Approach")).toBeInTheDocument();
    expect(
      screen.getByText("Systematic Investment Philosophy"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Multi-strategy approach across asset classes"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Risk-adjusted return maximization"),
    ).toBeInTheDocument();
  });
});
