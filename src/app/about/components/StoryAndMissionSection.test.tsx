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
        /To unlock elite investing opportunities for all growth-focused/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /To be Africa's most trusted AI-powered alternative investment/,
      ),
    ).toBeInTheDocument();
  });
});
