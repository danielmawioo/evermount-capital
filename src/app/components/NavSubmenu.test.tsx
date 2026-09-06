import { render, screen } from "@testing-library/react";
import { CpuChipIcon } from "@heroicons/react/24/outline";
import NavSubmenu from "./NavSubmenu";
import type { NavSubItem } from "./navItems";

const items: NavSubItem[] = [
  {
    id: "quantTrading",
    label: "Quantitative Trading",
    description: "AI-powered algorithmic strategies",
    href: "/features",
    icon: CpuChipIcon,
  },
  {
    id: "riskManagement",
    label: "Risk Management",
    description: "Real-time portfolio risk analytics",
    href: "/portfolio-insights",
    icon: CpuChipIcon,
  },
];

describe("NavSubmenu", () => {
  it("renders nothing when closed", () => {
    render(<NavSubmenu open={false} items={items} />);

    expect(screen.queryByText("Quantitative Trading")).not.toBeInTheDocument();
  });

  it("renders each submenu item with its label, description and href when open", () => {
    render(<NavSubmenu open={true} items={items} />);

    const firstLink = screen.getByText("Quantitative Trading").closest("a");
    expect(firstLink).toHaveAttribute("href", "/features");
    expect(
      screen.getByText("AI-powered algorithmic strategies"),
    ).toBeInTheDocument();

    const secondLink = screen.getByText("Risk Management").closest("a");
    expect(secondLink).toHaveAttribute("href", "/portfolio-insights");
    expect(
      screen.getByText("Real-time portfolio risk analytics"),
    ).toBeInTheDocument();
  });
});
