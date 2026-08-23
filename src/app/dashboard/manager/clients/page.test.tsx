import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";
import { setAuthTokens, setUser } from "@/lib/auth-storage";
import ManagerClientsPage from "./page";

const router = { push: jest.fn(), replace: jest.fn(), back: jest.fn() };

jest.mock("next/navigation", () => ({
  useRouter: () => router,
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

const CLIENT = {
  clientId: "client-1",
  fullName: "Ada Lovelace",
  email: "ada@example.com",
  kycStatus: "VERIFIED",
  wallet: { availableBalance: 1000, currency: "USD" },
  totalInvested: 500,
  activeInvestments: [],
};

const OPTION = {
  id: "opt-1",
  name: "Growth",
  strategyKey: "momentum",
  minInvestment: 100,
  riskLevel: "medium",
};

const PREVIEW = {
  programName: "Growth",
  strategyKey: "momentum",
  riskLevel: "medium",
  amount: 1000,
  currency: "USD",
  availableBalance: 1000,
  totalInvested: 500,
  totalPortfolioValue: 1500,
  balanceAfterAllocation: 0,
  allocationPctOfPortfolio: 66.67,
  strategyExposureAfterPct: 66.67,
  lockInMonths: 6,
  lockInEndsAt: "2027-01-01T00:00:00.000Z",
  planType: "standard",
  clientRiskTolerance: "medium",
  minInvestment: 100,
  meetsMinimum: true,
  sufficientFunds: true,
  canAllocate: true,
  riskLeverage: 1,
  effectiveExposure: 1000,
  maxRiskBudgetPct: 2,
  maxRiskBudgetUsd: 30,
  poolAum: 100000,
  poolSharePct: 1,
  navPerUnit: 1.05,
  strategyDailyReturnPct: 0.5,
  strategyCumulativeReturnPct: 5,
  warnings: [] as string[],
};

describe("ManagerClientsPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    localStorage.clear();
    sessionStorage.clear();
    setAuthTokens("token", "refresh", true);
    setUser(
      { id: "1", email: "m@b.com", fullName: "M B", role: "MANAGER" },
      true,
    );
    mock.onGet("/users/profile").reply(200, {
      id: "1",
      email: "m@b.com",
      fullName: "M B",
      kycStatus: "VERIFIED",
      role: "MANAGER",
    });
  });

  afterEach(() => {
    mock.restore();
    localStorage.clear();
    sessionStorage.clear();
    jest.restoreAllMocks();
  });

  it("renders the page heading and the assigned client's details once loaded", async () => {
    mock.onGet("/portfolio-manager/clients").reply(200, { clients: [CLIENT] });
    mock
      .onGet("/portfolio-manager/investment-options")
      .reply(200, { options: [OPTION] });
    mock
      .onPost("/portfolio-manager/clients/client-1/allocate/preview")
      .reply(200, { canAllocate: true, warnings: [] });

    render(<ManagerClientsPage />);

    expect(await screen.findByText("My Clients")).toBeInTheDocument();
    expect(await screen.findByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByText("ada@example.com")).toBeInTheDocument();
    expect(screen.getByText("KYC: VERIFIED")).toBeInTheDocument();
  });

  it("shows the empty state when the manager has no assigned clients", async () => {
    mock.onGet("/portfolio-manager/clients").reply(200, { clients: [] });
    mock
      .onGet("/portfolio-manager/investment-options")
      .reply(200, { options: [] });

    render(<ManagerClientsPage />);

    expect(
      await screen.findByText("No clients assigned yet."),
    ).toBeInTheDocument();
  });

  it("allocates a strategy for a client and shows a success toast", async () => {
    const user = userEvent.setup();
    const toastSuccess = jest.spyOn(toast, "success");
    mock.onGet("/portfolio-manager/clients").reply(200, { clients: [CLIENT] });
    mock
      .onGet("/portfolio-manager/investment-options")
      .reply(200, { options: [OPTION] });
    mock
      .onPost("/portfolio-manager/clients/client-1/allocate/preview")
      .reply(200, PREVIEW);
    mock.onPost("/portfolio-manager/clients/client-1/allocate").reply(200, {});

    render(<ManagerClientsPage />);

    const allocateButton = await screen.findByRole("button", {
      name: /review & allocate/i,
    });
    await waitFor(() => expect(allocateButton).not.toBeDisabled());
    await user.click(allocateButton);

    const confirmButton = await screen.findByRole("button", {
      name: /confirm allocation/i,
    });
    await user.click(confirmButton);

    await waitFor(() => {
      const call = mock.history.post?.find(
        (r) => r.url === "/portfolio-manager/clients/client-1/allocate",
      );
      expect(call).toBeDefined();
      expect(JSON.parse(call!.data)).toEqual({
        investmentOptionId: "opt-1",
        amount: 1000,
        lockInMonths: 6,
      });
    });
    expect(toastSuccess).toHaveBeenCalledWith("Strategy allocated for client");
    expect(screen.queryByText("Confirm allocation")).not.toBeInTheDocument();
  });

  it("shows an error toast when allocating a strategy fails", async () => {
    const user = userEvent.setup();
    const toastError = jest.spyOn(toast, "error");
    const toastSuccess = jest.spyOn(toast, "success");
    mock.onGet("/portfolio-manager/clients").reply(200, { clients: [CLIENT] });
    mock
      .onGet("/portfolio-manager/investment-options")
      .reply(200, { options: [OPTION] });
    mock
      .onPost("/portfolio-manager/clients/client-1/allocate/preview")
      .reply(200, PREVIEW);
    mock.onPost("/portfolio-manager/clients/client-1/allocate").reply(500);

    render(<ManagerClientsPage />);

    const allocateButton = await screen.findByRole("button", {
      name: /review & allocate/i,
    });
    await waitFor(() => expect(allocateButton).not.toBeDisabled());
    await user.click(allocateButton);

    const confirmButton = await screen.findByRole("button", {
      name: /confirm allocation/i,
    });
    await user.click(confirmButton);

    await waitFor(() =>
      expect(toastError).toHaveBeenCalledWith(
        "Allocation failed — check preview warnings",
      ),
    );
    expect(toastSuccess).not.toHaveBeenCalled();
    // The confirmation dialog stays open so the manager can retry.
    expect(
      await screen.findByRole("heading", { name: "Confirm allocation" }),
    ).toBeInTheDocument();
  });

  it("unassigns a client and removes them from the list on success", async () => {
    const user = userEvent.setup();
    const toastSuccess = jest.spyOn(toast, "success");
    const confirmSpy = jest.spyOn(window, "confirm").mockReturnValue(true);
    mock
      .onGet("/portfolio-manager/clients")
      .replyOnce(200, { clients: [CLIENT] });
    mock.onGet("/portfolio-manager/clients").reply(200, { clients: [] });
    mock
      .onGet("/portfolio-manager/investment-options")
      .reply(200, { options: [OPTION] });
    mock.onDelete("/portfolio-manager/clients/client-1").reply(200, {});

    render(<ManagerClientsPage />);

    const unassignButton = await screen.findByRole("button", {
      name: /unassign/i,
    });
    await user.click(unassignButton);

    expect(confirmSpy).toHaveBeenCalledWith(
      "Unassign Ada Lovelace? They will no longer appear in your client list.",
    );
    await waitFor(() =>
      expect(
        mock.history.delete?.some(
          (r) => r.url === "/portfolio-manager/clients/client-1",
        ),
      ).toBe(true),
    );
    expect(toastSuccess).toHaveBeenCalledWith("Client unassigned");
    expect(
      await screen.findByText("No clients assigned yet."),
    ).toBeInTheDocument();
  });

  it("shows an error toast when unassigning a client fails", async () => {
    const user = userEvent.setup();
    const toastError = jest.spyOn(toast, "error");
    jest.spyOn(window, "confirm").mockReturnValue(true);
    mock.onGet("/portfolio-manager/clients").reply(200, { clients: [CLIENT] });
    mock
      .onGet("/portfolio-manager/investment-options")
      .reply(200, { options: [OPTION] });
    mock.onDelete("/portfolio-manager/clients/client-1").reply(500);

    render(<ManagerClientsPage />);

    const unassignButton = await screen.findByRole("button", {
      name: /unassign/i,
    });
    await user.click(unassignButton);

    await waitFor(() =>
      expect(toastError).toHaveBeenCalledWith("Failed to unassign client"),
    );
    expect(await screen.findByText("Ada Lovelace")).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /unassign/i }),
    ).not.toBeDisabled();
  });
});
