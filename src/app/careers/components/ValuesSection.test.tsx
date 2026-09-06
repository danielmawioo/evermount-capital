import { render, screen } from "@testing-library/react";
import ValuesSection from "./ValuesSection";

describe("ValuesSection", () => {
  it("renders the heading and each team's title and description", () => {
    render(<ValuesSection />);

    expect(
      screen.getByRole("heading", { name: "Why Evermount?" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Engineering")).toBeInTheDocument();
    expect(
      screen.getByText(/Backend, distributed systems, data engineering/),
    ).toBeInTheDocument();

    expect(screen.getByText("Quantitative Research")).toBeInTheDocument();
    expect(screen.getByText("AI & Market Infrastructure")).toBeInTheDocument();
  });
});
