import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";
import AdminKYCReviewPage from "./page";

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: { success: jest.fn(), error: jest.fn() },
}));

const SUBMISSION = {
  id: "kyc-1",
  userId: "user-1",
  userEmail: "investor@example.com",
  userName: "Jane Investor",
  status: "PENDING",
  submittedAt: new Date(0).toISOString(),
};

describe("AdminKYCReviewPage", () => {
  let mock: MockAdapter;
  let originalPrompt: typeof window.prompt;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    (toast.success as jest.Mock).mockClear();
    (toast.error as jest.Mock).mockClear();
    originalPrompt = window.prompt;
  });

  afterEach(() => {
    mock.restore();
    window.prompt = originalPrompt;
  });

  it("renders pending submissions on mount using the PENDING filter", async () => {
    mock.onGet("/kyc").reply(200, { submissions: [SUBMISSION] });

    render(<AdminKYCReviewPage />);

    expect(screen.getByText(/Loading submissions/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("Jane Investor")).toBeInTheDocument(),
    );

    expect(screen.getByText("investor@example.com")).toBeInTheDocument();
    expect(mock.history.get.find((r) => r.url === "/kyc")?.params).toEqual({
      status: "PENDING",
    });
  });

  it("shows the empty state when there are no submissions", async () => {
    mock.onGet("/kyc").reply(200, { submissions: [] });

    render(<AdminKYCReviewPage />);

    await waitFor(() =>
      expect(screen.getByText("No submissions found.")).toBeInTheDocument(),
    );
  });

  it("refetches with the selected status when a filter tab is clicked", async () => {
    mock.onGet("/kyc").reply(200, { submissions: [SUBMISSION] });

    const user = userEvent.setup();
    render(<AdminKYCReviewPage />);

    await waitFor(() =>
      expect(screen.getByText("Jane Investor")).toBeInTheDocument(),
    );

    mock.resetHistory();
    mock.onGet("/kyc").reply(200, { submissions: [] });

    await user.click(screen.getByRole("button", { name: "Verified" }));

    await waitFor(() =>
      expect(mock.history.get.find((r) => r.url === "/kyc")?.params).toEqual({
        status: "VERIFIED",
      }),
    );
  });

  it("fetches without a status param when the All tab is selected", async () => {
    mock.onGet("/kyc").reply(200, { submissions: [SUBMISSION] });

    const user = userEvent.setup();
    render(<AdminKYCReviewPage />);

    await waitFor(() =>
      expect(screen.getByText("Jane Investor")).toBeInTheDocument(),
    );

    mock.resetHistory();
    mock.onGet("/kyc").reply(200, { submissions: [SUBMISSION] });

    await user.click(screen.getByRole("button", { name: "All" }));

    await waitFor(() =>
      expect(mock.history.get.some((r) => r.url === "/kyc")).toBe(true),
    );
    expect(
      mock.history.get.find((r) => r.url === "/kyc")?.params,
    ).toBeUndefined();
  });

  it("approves a submission", async () => {
    mock.onGet("/kyc").reply(200, { submissions: [SUBMISSION] });
    mock.onPut("/kyc/kyc-1").reply(200, {});

    const user = userEvent.setup();
    render(<AdminKYCReviewPage />);

    await waitFor(() =>
      expect(screen.getByText("Jane Investor")).toBeInTheDocument(),
    );

    mock.onGet("/kyc").reply(200, { submissions: [] });
    await user.click(screen.getByRole("button", { name: "Approve" }));

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith("KYC approved"),
    );
    const putCall = mock.history.put.find((r) => r.url === "/kyc/kyc-1");
    expect(JSON.parse(putCall?.data)).toEqual({
      status: "VERIFIED",
      notes: undefined,
    });
  });

  it("rejects a submission with a prompted reason", async () => {
    window.prompt = jest.fn(() => "Document unreadable");
    mock.onGet("/kyc").reply(200, { submissions: [SUBMISSION] });
    mock.onPut("/kyc/kyc-1").reply(200, {});

    const user = userEvent.setup();
    render(<AdminKYCReviewPage />);

    await waitFor(() =>
      expect(screen.getByText("Jane Investor")).toBeInTheDocument(),
    );

    mock.onGet("/kyc").reply(200, { submissions: [] });
    await user.click(screen.getByRole("button", { name: "Reject" }));

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith("KYC rejected"),
    );
    const putCall = mock.history.put.find((r) => r.url === "/kyc/kyc-1");
    expect(JSON.parse(putCall?.data)).toEqual({
      status: "REJECTED",
      notes: "Document unreadable",
    });
  });

  it("shows an error toast when the update call fails", async () => {
    mock.onGet("/kyc").reply(200, { submissions: [SUBMISSION] });
    mock.onPut("/kyc/kyc-1").reply(500);

    const user = userEvent.setup();
    render(<AdminKYCReviewPage />);

    await waitFor(() =>
      expect(screen.getByText("Jane Investor")).toBeInTheDocument(),
    );

    await user.click(screen.getByRole("button", { name: "Approve" }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("Failed to update KYC status"),
    );
  });
});
