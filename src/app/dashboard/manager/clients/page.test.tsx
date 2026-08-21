import { render, screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
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

describe("ManagerClientsPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    localStorage.clear();
    sessionStorage.clear();
    setAuthTokens("token", "refresh", true);
    setUser(
      { id: "1", email: "m@b.com", fullName: "M B", role: "MANAGER" },
      true
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

    expect(await screen.findByText("No clients assigned yet.")).toBeInTheDocument();
  });
});
