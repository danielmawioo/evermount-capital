import { render, screen } from "@testing-library/react";
import FeaturesPage from "./page";

describe("FeaturesPage", () => {
  it("renders without crashing and shows the main heading", () => {
    render(<FeaturesPage />);
    expect(
      screen.getByRole("heading", { name: /platform built for performance/i })
    ).toBeInTheDocument();
  });

  it("renders the feature cards and risk metrics section", () => {
    render(<FeaturesPage />);
    expect(
      screen.getByRole("heading", { name: /quantitative trading models/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /real-time dashboards/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /risk metrics & capital protection/i })
    ).toBeInTheDocument();
  });
});
