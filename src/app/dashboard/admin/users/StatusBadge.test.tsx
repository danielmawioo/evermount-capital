import { render, screen } from "@testing-library/react";
import StatusBadge from "./StatusBadge";

describe("StatusBadge", () => {
  it("renders the active variant with a check icon and green styling", () => {
    render(<StatusBadge status="active" />);

    const badge = screen.getByText("active");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-green-100", "text-green-700");
  });

  it("renders the inactive variant with an x icon and gray styling", () => {
    render(<StatusBadge status="inactive" />);

    const badge = screen.getByText("inactive");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-gray-100", "text-gray-700");
  });
});
