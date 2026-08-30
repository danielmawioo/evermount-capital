import { render, screen } from "@testing-library/react";
import ExtendedHomeSections from "./ExtendedHomeSections";

describe("ExtendedHomeSections", () => {
  it("renders without throwing and shows key section headings", () => {
    render(<ExtendedHomeSections />);

    expect(
      screen.getByText(
        /Evermount — The AI Financial Intelligence & Trading Infrastructure Company for Africa/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("The Evermount Technology Stack"),
    ).toBeInTheDocument();
    expect(screen.getByText("Our Technology Philosophy")).toBeInTheDocument();
    expect(screen.getByText("Evermount AI")).toBeInTheDocument();
    expect(
      screen.getByText("One Platform. Multiple Financial Systems."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("World-Class Research & Engineering Team"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Institutional-Grade Infrastructure & Risk Controls"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("The Evermount Intelligence Stack"),
    ).toBeInTheDocument();
  });

  it("renders leadership team members", () => {
    render(<ExtendedHomeSections />);

    expect(screen.getByText("Daniel Mawioo")).toBeInTheDocument();
    expect(
      screen.getByText("CEO, Co-Founder & Low-Latency Systems Engineer"),
    ).toBeInTheDocument();
    expect(screen.getByText("Evans Kipngetich")).toBeInTheDocument();
  });

  it("renders the final CTA links", () => {
    render(<ExtendedHomeSections />);

    expect(
      screen.getByRole("link", { name: "Explore the Platform" }),
    ).toHaveAttribute("href", "/platform");
    expect(
      screen.getByRole("link", { name: "Partner With Evermount" }),
    ).toHaveAttribute("href", "/book-demo");
  });

  it("renders capability metric cards", () => {
    render(<ExtendedHomeSections />);

    expect(
      screen.getAllByText("AI Financial Intelligence").length,
    ).toBeGreaterThan(0);
    expect(screen.getByText("Intelligent Execution")).toBeInTheDocument();
  });
});
