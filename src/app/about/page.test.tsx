import { render, screen } from "@testing-library/react";
import AboutPage from "./page";

describe("AboutPage", () => {
  it("renders without crashing and shows the main heading", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", {
        name: /Evermount — The AI Financial Intelligence & Trading Infrastructure Company for Africa/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the mission, vision, and founders sections", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", { name: /our mission/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /our vision/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /meet our founders/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Daniel Mawioo")).toBeInTheDocument();
    expect(screen.getByText("Evans Kipngetich")).toBeInTheDocument();
  });

  it("links to the platform page from the technology section CTA", () => {
    render(<AboutPage />);
    const link = screen.getByRole("link", {
      name: /learn more about our platform/i,
    });
    expect(link).toHaveAttribute("href", "/platform");
  });
});
