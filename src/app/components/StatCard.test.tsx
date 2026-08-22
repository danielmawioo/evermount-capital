import { render, screen } from "@testing-library/react";
import StatCard from "./StatCard";

describe("StatCard", () => {
  it("renders title, value and icon", () => {
    render(
      <StatCard
        title="Total Balance"
        value="$12,345"
        icon={<span data-testid="icon">i</span>}
      />,
    );

    expect(screen.getByText("Total Balance")).toBeInTheDocument();
    expect(screen.getByText("$12,345")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders positive growth with an up arrow and green styling", () => {
    render(<StatCard title="Growth" value="$1" growth="+5.1%" />);

    const growthText = screen.getByText(/\+5\.1%/);
    expect(growthText).toBeInTheDocument();
    expect(screen.getByText(/▲/)).toBeInTheDocument();
    expect(growthText).toHaveClass("text-green-500");
  });

  it("renders negative growth with a down arrow and red styling", () => {
    render(<StatCard title="Growth" value="$1" growth="-2.3%" />);

    const growthText = screen.getByText(/-2\.3%/);
    expect(growthText).toBeInTheDocument();
    expect(screen.getByText(/▼/)).toBeInTheDocument();
    expect(growthText).toHaveClass("text-red-500");
  });

  it("renders neutral growth with a dash and gray styling", () => {
    render(<StatCard title="Growth" value="$1" growth="Stable" />);

    const growthText = screen.getByText(/Stable/);
    expect(growthText).toBeInTheDocument();
    expect(growthText).toHaveClass("text-gray-400");
  });

  it("does not render the growth line when growth is not provided", () => {
    render(<StatCard title="Growth" value="$1" />);

    expect(screen.queryByText(/from last period/)).not.toBeInTheDocument();
  });
});
