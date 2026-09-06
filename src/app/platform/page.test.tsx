import { render, screen } from "@testing-library/react";
import PlatformPage from "./page";

describe("PlatformPage", () => {
  it("renders without crashing and shows the main heading", () => {
    render(<PlatformPage />);
    expect(
      screen.getByRole("heading", {
        name: /the evermount financial infrastructure platform/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders platform capability sections", () => {
    render(<PlatformPage />);
    expect(
      screen.getByRole("heading", { name: /market data infrastructure/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /quantitative research/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /risk infrastructure/i }),
    ).toBeInTheDocument();
  });
});
