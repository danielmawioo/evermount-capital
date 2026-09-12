import { render, screen } from "@testing-library/react";
import DevelopersPage from "./page";

describe("Developers page", () => {
  it("does not advertise unbuilt API products", () => {
    render(<DevelopersPage />);

    expect(
      screen.getByRole("heading", {
        name: /Access, not a catalog of unbuilt APIs/i,
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Market Data API")).not.toBeInTheDocument();
    expect(screen.queryByText("Coming soon")).not.toBeInTheDocument();
    expect(screen.getByText(/GET \/api\/research\/gex/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /View gold GEX/i }),
    ).toHaveAttribute("href", "/research#gold-gex");
  });
});
