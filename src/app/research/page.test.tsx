import { render, screen, waitFor } from "@testing-library/react";
import ResearchPage from "./page";

describe("Research page", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        live: false,
        updatedAt: "2026-09-01T12:07:00Z",
        source: "engine-fixture",
        spot: 4367.86,
        futures: 4372.4,
        basis: 4.54,
        gammaFlip: 4360,
        maxPain: 4350,
        gex: 0,
        regime: "illustrative",
        note: "Illustrative snapshot from the GEX engine fixture.",
      }),
    }) as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the gold GEX board instead of a capability catalog", async () => {
    render(<ResearchPage />);

    expect(
      screen.getByRole("heading", { name: "Gold market structure" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Publications: coming soon."),
    ).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("XAU spot")).toBeInTheDocument();
    });
    expect(screen.getByText("Gamma flip")).toBeInTheDocument();
  });
});
