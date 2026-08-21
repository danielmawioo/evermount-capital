import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";
import CompliancePage from "./page";

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: { success: jest.fn(), error: jest.fn() },
}));

const REPORT = {
  generatedAt: new Date(0).toISOString(),
  accessControls: {
    adminAccounts: 3,
    activeInvestors: 42,
    mfaEnforced: true,
    note: "All admin accounts require MFA.",
  },
  auditTrail: {
    eventsLast30Days: 128,
    sensitiveActionsLast30Days: [
      { action: "WITHDRAWAL_APPROVED", entity: "wallet:1", createdAt: new Date(0).toISOString() },
    ],
  },
  dataProtection: {
    readReplicaConfigured: true,
    fileStorageProvider: "s3",
  },
};

describe("CompliancePage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    (toast.success as jest.Mock).mockClear();
    (toast.error as jest.Mock).mockClear();
    global.URL.createObjectURL = jest.fn(() => "blob:mock");
    global.URL.revokeObjectURL = jest.fn();
  });

  afterEach(() => {
    mock.restore();
  });

  it("loads and renders the compliance report", async () => {
    mock.onGet("/admin/compliance/report").reply(200, REPORT);
    mock.onGet("/admin/compliance/audit-logs").reply(200, { total: 128 });

    render(<CompliancePage />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("128")).toBeInTheDocument());

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText(/All admin accounts require MFA/)).toBeInTheDocument();
    expect(screen.getByText(/WITHDRAWAL_APPROVED/)).toBeInTheDocument();

    expect(
      mock.history.get.find((r) => r.url === "/admin/compliance/audit-logs")?.params
    ).toEqual({ limit: 10 });
  });

  it("shows an error toast when loading fails", async () => {
    mock.onGet("/admin/compliance/report").reply(500);
    mock.onGet("/admin/compliance/audit-logs").reply(200, { total: 0 });

    render(<CompliancePage />);

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("Failed to load compliance data")
    );
  });

  it("exports the audit CSV and triggers a download", async () => {
    mock.onGet("/admin/compliance/report").reply(200, REPORT);
    mock.onGet("/admin/compliance/audit-logs").reply(200, { total: 128 });
    mock
      .onGet("/admin/compliance/audit-logs/export")
      .reply(200, new Blob(["a,b,c"]));

    const user = userEvent.setup();
    render(<CompliancePage />);

    await waitFor(() => expect(screen.getByText("128")).toBeInTheDocument());

    await user.click(screen.getByRole("button", { name: /Export audit CSV/i }));

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith("Audit log exported")
    );
    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(global.URL.revokeObjectURL).toHaveBeenCalled();
  });
});
