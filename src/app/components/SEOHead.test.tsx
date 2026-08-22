import { render } from "@testing-library/react";
import SEOHead from "./SEOHead";

describe("SEOHead", () => {
  it("injects review and breadcrumb JSON-LD structured data scripts", () => {
    render(<SEOHead />);

    const reviewScript = document.body.querySelector("#review-structured-data");
    const breadcrumbScript = document.body.querySelector(
      "#breadcrumb-structured-data",
    );

    expect(reviewScript).toBeInTheDocument();
    expect(reviewScript?.getAttribute("type")).toBe("application/ld+json");
    const reviewData = JSON.parse(reviewScript?.innerHTML ?? "{}");
    expect(reviewData["@type"]).toBe("Review");
    expect(reviewData.itemReviewed.name).toBe("Evermount Capital");

    expect(breadcrumbScript).toBeInTheDocument();
    const breadcrumbData = JSON.parse(breadcrumbScript?.innerHTML ?? "{}");
    expect(breadcrumbData["@type"]).toBe("BreadcrumbList");
    expect(breadcrumbData.itemListElement[0].name).toBe("Home");
  });
});
