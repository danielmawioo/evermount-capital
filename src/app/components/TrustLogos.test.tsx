import { render, screen } from "@testing-library/react";
import TrustLogos from "./TrustLogos";

describe("TrustLogos", () => {
  it("renders the section label and duplicated logo images for the marquee", () => {
    render(<TrustLogos />);

    expect(
      screen.getByText("We Support Seamless Transactions Via:"),
    ).toBeInTheDocument();

    // The logo list is duplicated ([...logos, ...logos]) to create a seamless
    // scrolling marquee effect, so each logo appears twice.
    expect(screen.getAllByAltText("Visa")).toHaveLength(2);
    expect(screen.getAllByAltText("Bitcoin")).toHaveLength(2);
    expect(screen.getAllByAltText("Stripe")).toHaveLength(2);
  });
});
