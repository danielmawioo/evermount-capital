import { render, screen } from "@testing-library/react";
import TrustLogos from "./TrustLogos";

describe("TrustLogos", () => {
  it("renders the intelligence stack architecture", () => {
    render(<TrustLogos />);

    expect(
      screen.getByText("The Evermount Intelligence Stack"),
    ).toBeInTheDocument();
    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("Intelligence")).toBeInTheDocument();
    expect(screen.getByText("Research")).toBeInTheDocument();
    expect(screen.getByText("Risk")).toBeInTheDocument();
    expect(screen.getByText("Execution")).toBeInTheDocument();
  });
});
