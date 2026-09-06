import { render, screen } from "@testing-library/react";
import TrustLogos from "./TrustLogos";

describe("TrustLogos", () => {
  it("renders the infrastructure stack architecture", () => {
    render(<TrustLogos />);

    expect(
      screen.getByText("The Evermount Infrastructure Stack"),
    ).toBeInTheDocument();
    expect(screen.getByText("Market Data")).toBeInTheDocument();
    expect(screen.getByText("Data Platform")).toBeInTheDocument();
    expect(screen.getByText("Quant + AI")).toBeInTheDocument();
    expect(screen.getByText("Risk")).toBeInTheDocument();
    expect(screen.getByText("Execution")).toBeInTheDocument();
  });
});
