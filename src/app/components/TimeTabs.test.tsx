import { render, screen, fireEvent } from "@testing-library/react";
import TimeTabs from "./TimeTabs";

describe("TimeTabs", () => {
  it("renders all tabs with Monthly active by default", () => {
    render(<TimeTabs />);

    ["Daily", "Weekly", "Monthly", "Yearly"].forEach((tab) => {
      expect(screen.getByRole("button", { name: tab })).toBeInTheDocument();
    });

    expect(screen.getByRole("button", { name: "Monthly" })).toHaveClass(
      "bg-[#00a76f]"
    );
    expect(screen.getByRole("button", { name: "Daily" })).not.toHaveClass(
      "bg-[#00a76f]"
    );
  });

  it("switches the active tab and calls onChange when clicked", () => {
    const onChange = jest.fn();
    render(<TimeTabs onChange={onChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Weekly" }));

    expect(onChange).toHaveBeenCalledWith("Weekly");
    expect(screen.getByRole("button", { name: "Weekly" })).toHaveClass(
      "bg-[#00a76f]"
    );
    expect(screen.getByRole("button", { name: "Monthly" })).not.toHaveClass(
      "bg-[#00a76f]"
    );
  });

  it("does not throw when onChange is not provided", () => {
    render(<TimeTabs />);
    expect(() =>
      fireEvent.click(screen.getByRole("button", { name: "Yearly" }))
    ).not.toThrow();
  });
});
