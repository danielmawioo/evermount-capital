import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import StatementsPage from "./page";

describe("StatementsPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("renders the empty state when there are no statements", async () => {
    mock.onGet("/statements").reply(200, []);

    render(<StatementsPage />);

    expect(
      screen.getByRole("heading", { name: /Monthly Statements/ })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        "No statements yet. Statements are generated monthly by the platform."
      )
    ).toBeInTheDocument();
  });

  it("lists statements with period, value, and return", async () => {
    mock.onGet("/statements").reply(200, [
      {
        id: "s1",
        periodStart: "2024-01-01T00:00:00.000Z",
        periodEnd: "2024-01-31T00:00:00.000Z",
        fileUrl: "/files/s1.pdf",
        createdAt: "2024-02-01T00:00:00.000Z",
        metadata: { totalValue: 5000, totalReturnPercent: 3.2 },
      },
    ]);

    render(<StatementsPage />);

    expect(await screen.findByText("$5000.00")).toBeInTheDocument();
    expect(screen.getByText("3.20%")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /PDF/ })).toBeInTheDocument();
  });

  it("downloads a statement when the PDF button is clicked", async () => {
    mock.onGet("/statements").reply(200, [
      {
        id: "s1",
        periodStart: "2024-01-01T00:00:00.000Z",
        periodEnd: "2024-01-31T00:00:00.000Z",
        fileUrl: "/files/s1.pdf",
        createdAt: "2024-02-01T00:00:00.000Z",
      },
    ]);

    const blob = new Blob(["pdf-bytes"], { type: "application/pdf" });
    const fetchSpy = jest
      .fn()
      .mockResolvedValue({ ok: true, blob: async () => blob } as Response);
    global.fetch = fetchSpy as unknown as typeof fetch;
    const createObjectURL = jest.fn().mockReturnValue("blob:mock-url");
    const revokeObjectURL = jest.fn();
    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = revokeObjectURL;

    const user = userEvent.setup();
    render(<StatementsPage />);

    await user.click(await screen.findByRole("button", { name: /PDF/ }));

    await waitFor(() => expect(fetchSpy).toHaveBeenCalled());
    expect(createObjectURL).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:mock-url");

    // @ts-expect-error - cleaning up test-only global stubs
    delete global.fetch;
    // @ts-expect-error - cleaning up test-only global stubs
    delete URL.createObjectURL;
    // @ts-expect-error - cleaning up test-only global stubs
    delete URL.revokeObjectURL;
  });
});
