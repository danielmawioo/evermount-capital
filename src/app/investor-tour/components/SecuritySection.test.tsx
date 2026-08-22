import { render, screen } from "@testing-library/react";
import SecuritySection from "./SecuritySection";

describe("SecuritySection", () => {
  it("renders the section heading, image and all security points", () => {
    render(<SecuritySection />);

    expect(
      screen.getByText("Institutional-Grade Security"),
    ).toBeInTheDocument();

    expect(screen.getByRole("img", { name: "Security" })).toBeInTheDocument();

    expect(
      screen.getByText("Multi-layer risk management framework"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("24/7 monitoring of trading environments"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Investor capital protected through isolation and limits",
      ),
    ).toBeInTheDocument();
  });
});
