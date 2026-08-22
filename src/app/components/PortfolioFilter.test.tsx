import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PortfolioFilter from "./PortfolioFilter";

describe("PortfolioFilter", () => {
  it("renders all filter options with 'All' selected by default", () => {
    render(<PortfolioFilter />);

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("All");
    ["All", "Equities", "Crypto", "Real Estate", "Commodities"].forEach(
      (opt) => {
        expect(
          screen.getByRole("option", { name: opt })
        ).toBeInTheDocument();
      }
    );
  });

  it("calls onFilter with the newly selected value", async () => {
    const user = userEvent.setup();
    const onFilter = jest.fn();
    render(<PortfolioFilter onFilter={onFilter} />);

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "Crypto");

    expect(onFilter).toHaveBeenCalledWith("Crypto");
    expect((select as HTMLSelectElement).value).toBe("Crypto");
  });

  it("does not throw when onFilter is not provided", async () => {
    const user = userEvent.setup();
    render(<PortfolioFilter />);

    await user.selectOptions(screen.getByRole("combobox"), "Equities");

    expect((screen.getByRole("combobox") as HTMLSelectElement).value).toBe(
      "Equities"
    );
  });
});
