import { render, screen } from "@testing-library/react";
import FoundersSection from "./FoundersSection";

describe("FoundersSection", () => {
  it("renders the heading and each founder's name, role and bio", () => {
    render(<FoundersSection />);

    expect(
      screen.getByRole("heading", { name: "Meet Our Founders" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Daniel Mawioo")).toBeInTheDocument();
    expect(screen.getByText("CEO & Co-Founder")).toBeInTheDocument();

    expect(screen.getByText("Evans Kipngetich")).toBeInTheDocument();
    expect(
      screen.getByText("Chief Data Officer & Co-Founder"),
    ).toBeInTheDocument();

    expect(screen.getByText("Tony K.")).toBeInTheDocument();
    expect(
      screen.getByText("Head of Quantitative Research"),
    ).toBeInTheDocument();
  });

  it("renders a LinkedIn link for founders with a real profile URL", () => {
    render(<FoundersSection />);

    const links = screen.getAllByRole("link");
    const hrefs = links.map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("https://www.linkedin.com/in/danielmawioo/");
    expect(hrefs).toContain("https://www.linkedin.com/in/evans-kipngetich/");
  });

  it("does not render a LinkedIn link for a founder whose linkedin is '#'", () => {
    render(<FoundersSection />);

    const links = screen.getAllByRole("link");
    const hrefs = links.map((link) => link.getAttribute("href"));
    expect(hrefs).not.toContain("#");
    expect(links).toHaveLength(2);
  });
});
