import { render } from "@testing-library/react";
import SEOHead from "./SEOHead";

describe("SEOHead", () => {
  it("injects breadcrumb JSON-LD structured data script", () => {
    render(<SEOHead />);

    const reviewScript = document.body.querySelector("#review-structured-data");
    const breadcrumbScript = document.body.querySelector(
      "#breadcrumb-structured-data",
    );

    expect(reviewScript).not.toBeInTheDocument();

    expect(breadcrumbScript).toBeInTheDocument();
    const breadcrumbData = JSON.parse(breadcrumbScript?.innerHTML ?? "{}");
    expect(breadcrumbData["@type"]).toBe("BreadcrumbList");
    expect(breadcrumbData.itemListElement[0].name).toBe("Home");
  });
});
