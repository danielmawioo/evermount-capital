import { render, screen } from "@testing-library/react";
import FooterColumn from "./FooterColumn";

describe("FooterColumn", () => {
  it("renders the column title and links with correct hrefs", () => {
    render(
      <FooterColumn
        title="Markets"
        headingClassName="text-gray-900 dark:text-white font-semibold mb-5 text-base"
        links={[
          { label: "Evermount CFDs", href: "#", className: "link-a" },
          { label: "Future Markets", href: "#", className: "link-a" },
        ]}
      />,
    );

    expect(screen.getByText("Markets")).toBeInTheDocument();

    const cfdsLink = screen.getByText("Evermount CFDs");
    expect(cfdsLink).toHaveAttribute("href", "#");
    expect(cfdsLink).toHaveClass("link-a");

    const marketsLink = screen.getByText("Future Markets");
    expect(marketsLink).toHaveAttribute("href", "#");
  });

  it("renders each link with the href from the data", () => {
    render(
      <FooterColumn
        title="Legal & Compliance"
        headingClassName="text-gray-900 dark:text-white font-semibold mb-5 text-base"
        links={[
          { label: "Terms of Service", href: "/terms", className: "a" },
          { label: "Privacy Policy", href: "/privacy", className: "b" },
        ]}
      />,
    );

    expect(screen.getByText("Terms of Service")).toHaveAttribute(
      "href",
      "/terms",
    );
    expect(screen.getByText("Privacy Policy")).toHaveAttribute(
      "href",
      "/privacy",
    );
  });
});
