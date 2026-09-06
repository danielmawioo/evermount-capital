import { render, screen } from "@testing-library/react";
import CapitalPage from "./page";

describe("Capital page", () => {
  it("presents Capital as a product of the platform, with a login path", () => {
    render(<CapitalPage />);

    expect(
      screen.getByRole("heading", { name: "Evermount Capital" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/one product of the Evermount platform/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Capital login/i }),
    ).toHaveAttribute("href", "/login");
  });
});
