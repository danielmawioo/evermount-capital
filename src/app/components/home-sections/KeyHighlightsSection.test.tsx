import { render, screen } from "@testing-library/react";
import KeyHighlightsSection from "./KeyHighlightsSection";

describe("KeyHighlightsSection", () => {
  it("renders the heading, subtitle, and all highlight cards", () => {
    render(<KeyHighlightsSection />);

    expect(screen.getByText("Key Highlights")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Power up your investing journey with Evermount's most valuable features.",
      ),
    ).toBeInTheDocument();

    expect(screen.getByText("Transparent Fee Structure")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Clear management and performance fees aligned with investor interests.",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Dedicated Relationship Management"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Direct access to portfolio managers and research team.",
      ),
    ).toBeInTheDocument();
  });
});
