import { render, screen } from "@testing-library/react";
import StoryAndMissionSection from "./StoryAndMissionSection";

describe("StoryAndMissionSection", () => {
  it("renders the story, mission and vision headings", () => {
    render(<StoryAndMissionSection />);

    expect(
      screen.getByRole("heading", { name: "Our Story" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Our Mission" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Our Vision" }),
    ).toBeInTheDocument();
  });

  it("renders representative body copy", () => {
    render(<StoryAndMissionSection />);

    expect(
      screen.getByText(/Founded in 2023, Evermount Capital emerged/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /To build the quantitative research, AI and trading infrastructure/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /To become one of Africa's leading quantitative trading/,
      ),
    ).toBeInTheDocument();
  });
});
