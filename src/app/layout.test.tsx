import { render, screen } from "@testing-library/react";
import RootLayout, { metadata } from "./layout";

jest.mock("./components/LayoutWrapper", () => {
  return function MockLayoutWrapper({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div data-testid="layout-wrapper">{children}</div>;
  };
});

jest.mock("./components/IntercomProvider", () => {
  return function MockIntercomProvider() {
    return null;
  };
});

jest.mock("./components/Analytics", () => {
  return function MockAnalytics() {
    return null;
  };
});

describe("RootLayout", () => {
  it("exports metadata with the expected shape", () => {
    expect(metadata.title).toEqual({
      default: "Evermount Capital | Quantitative Trading Infrastructure for Africa",
      template: "%s | Evermount Capital",
    });
    expect(metadata.description).toMatch(
      /quantitative trading and market-making/i,
    );
    expect(metadata.alternates).toEqual({
      canonical: "https://www.evermount.co",
    });
  });

  it("renders children without throwing", () => {
    expect(() =>
      render(
        <RootLayout>
          <div>test-child</div>
        </RootLayout>,
      ),
    ).not.toThrow();

    expect(screen.getByText("test-child")).toBeInTheDocument();
  });
});
