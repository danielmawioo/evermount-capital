import { render, screen } from "@testing-library/react";
import LiveMarketTicker from "./LiveMarketTicker";

jest.mock("@/app/components/TranslateTree", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}));

describe("LiveMarketTicker", () => {
  it("renders sample movers without a live pulse", () => {
    render(<LiveMarketTicker />);

    expect(screen.getByText("Top Movers")).toBeInTheDocument();
    expect(screen.getByText("Sample")).toBeInTheDocument();
    expect(
      screen.getByText("Sample data • Illustrative only"),
    ).toBeInTheDocument();
    expect(screen.getByText("Solana")).toBeInTheDocument();
    expect(document.querySelector(".bg-green-500")).not.toBeInTheDocument();
  });
});
