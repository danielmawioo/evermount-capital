import { render, screen } from "@testing-library/react";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  scaleIn,
  slideInLeft,
  slideInRight,
  hoverScale,
  AnimatedSection,
  AnimatedCard,
} from "./PageAnimations";

describe("PageAnimations", () => {
  it("exports animation variant objects with expected shapes", () => {
    expect(fadeInUp.initial).toEqual({ opacity: 0, y: 30 });
    expect(staggerContainer.visible.transition.staggerChildren).toBe(0.1);
    expect(staggerItem.visible.transition.duration).toBe(0.5);
    expect(scaleIn.initial).toEqual({ opacity: 0, scale: 0.9 });
    expect(slideInLeft.initial).toEqual({ opacity: 0, x: -50 });
    expect(slideInRight.initial).toEqual({ opacity: 0, x: 50 });
    expect(hoverScale.whileHover).toEqual({ scale: 1.05, y: -5 });
  });

  it("renders AnimatedSection with children and className", () => {
    render(
      <AnimatedSection className="my-section">
        <p>Section content</p>
      </AnimatedSection>
    );

    const content = screen.getByText("Section content");
    expect(content).toBeInTheDocument();
    expect(content.parentElement).toHaveClass("my-section");
  });

  it("renders AnimatedCard with children and className", () => {
    render(
      <AnimatedCard className="my-card">
        <span>Card content</span>
      </AnimatedCard>
    );

    const content = screen.getByText("Card content");
    expect(content).toBeInTheDocument();
    expect(content.parentElement).toHaveClass("my-card");
  });
});
