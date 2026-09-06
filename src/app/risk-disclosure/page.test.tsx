import { render, screen } from "@testing-library/react";
import RiskDisclosurePage, { metadata } from "./page";

describe("RiskDisclosurePage", () => {
  it("renders the risk disclosure content", () => {
    render(<RiskDisclosurePage />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Risk Disclosure Statement/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /IMPORTANT: Please read this risk disclosure carefully/i,
      ),
    ).toBeInTheDocument();
  });

  it("exports metadata with the expected title", () => {
    expect(metadata.title).toBe("Risk Disclosure | Evermount");
  });
});
