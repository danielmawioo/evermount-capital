import { render, screen } from "@testing-library/react";
import CompanyStorySection from "./CompanyStorySection";

describe("CompanyStorySection", () => {
  it("renders the company overview heading, copy, and link", () => {
    render(<CompanyStorySection />);

    expect(screen.getByText("About Evermount")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Infrastructure for Institutions, Developers and Researchers/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Learn More About Us/ }),
    ).toHaveAttribute("href", "/about");
  });

  it("renders the technology philosophy heading and principles", () => {
    render(<CompanyStorySection />);

    expect(screen.getByText("Our Approach")).toBeInTheDocument();
    expect(screen.getByText("Our Technology Philosophy")).toBeInTheDocument();
    expect(screen.getByText(/Intelligence First/)).toBeInTheDocument();
    expect(
      screen.getByText(/Infrastructure Over Products/),
    ).toBeInTheDocument();
  });
});
