import { render, screen } from "@testing-library/react";
import ValuesSection from "./ValuesSection";

describe("ValuesSection", () => {
  it("renders the heading and each value's title and description", () => {
    render(<ValuesSection />);

    expect(
      screen.getByRole("heading", { name: "Why Evermount?" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Impactful Mission")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Help investors worldwide optimize returns through systematic quantitative strategies/,
      ),
    ).toBeInTheDocument();

    expect(screen.getByText("Growth Culture")).toBeInTheDocument();
    expect(
      screen.getByText(/We invest in you. Mentorship, ownership/),
    ).toBeInTheDocument();

    expect(screen.getByText("Global Collaboration")).toBeInTheDocument();
    expect(
      screen.getByText(/Work with brilliant minds across continents/),
    ).toBeInTheDocument();
  });
});
