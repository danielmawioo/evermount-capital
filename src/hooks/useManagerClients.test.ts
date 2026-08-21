import { renderHook, waitFor, act } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import { useManagerClients } from "./useManagerClients";

const CLIENT = {
  clientId: "client-1",
  fullName: "Ada Lovelace",
  email: "ada@example.com",
  kycStatus: "VERIFIED",
  wallet: { availableBalance: 1000, currency: "USD" },
  totalInvested: 0,
  activeInvestments: [],
};

const OPTION = {
  id: "opt-1",
  name: "Growth",
  strategyKey: "momentum",
  minInvestment: 100,
  riskLevel: "medium",
};

describe("useManagerClients", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    jest.useFakeTimers();
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
    jest.useRealTimers();
  });

  it("loads clients and investment options, seeding one form per client", async () => {
    mock.onGet("/portfolio-manager/clients").reply(200, { clients: [CLIENT] });
    mock
      .onGet("/portfolio-manager/investment-options")
      .reply(200, { options: [OPTION] });

    const { result } = renderHook(() => useManagerClients());

    await act(async () => {
      await result.current.load();
    });

    expect(result.current.clients).toEqual([CLIENT]);
    expect(result.current.forms["client-1"]).toEqual({
      investmentOptionId: "opt-1",
      amount: "1000",
      lockInMonths: 6,
    });
  });

  it("debounces and fetches an allocation preview after updateForm", async () => {
    mock.onGet("/portfolio-manager/clients").reply(200, { clients: [CLIENT] });
    mock
      .onGet("/portfolio-manager/investment-options")
      .reply(200, { options: [OPTION] });
    mock
      .onPost("/portfolio-manager/clients/client-1/allocate/preview")
      .reply(200, { canAllocate: true, warnings: [] });

    const { result } = renderHook(() => useManagerClients());

    await act(async () => {
      await result.current.load();
    });

    act(() => {
      result.current.updateForm("client-1", { amount: "500" });
    });

    act(() => {
      jest.advanceTimersByTime(350);
    });

    await waitFor(() =>
      expect(result.current.previews["client-1"]?.canAllocate).toBe(true)
    );
  });

  it("clamps the amount to the available balance", async () => {
    mock.onGet("/portfolio-manager/clients").reply(200, { clients: [CLIENT] });
    mock
      .onGet("/portfolio-manager/investment-options")
      .reply(200, { options: [OPTION] });
    mock
      .onPost("/portfolio-manager/clients/client-1/allocate/preview")
      .reply(200, { canAllocate: true, warnings: [] });

    const { result } = renderHook(() => useManagerClients());

    await act(async () => {
      await result.current.load();
    });

    act(() => {
      result.current.updateForm("client-1", { amount: "5000" }, 1000);
    });

    expect(result.current.forms["client-1"].amount).toBe("1000");
  });

  it("unassigns a client after confirmation and reloads", async () => {
    mock.onGet("/portfolio-manager/clients").reply(200, { clients: [CLIENT] });
    mock
      .onGet("/portfolio-manager/investment-options")
      .reply(200, { options: [OPTION] });
    mock.onDelete("/portfolio-manager/clients/client-1").reply(200, {});

    const originalConfirm = window.confirm;
    window.confirm = jest.fn().mockReturnValue(true);

    const { result } = renderHook(() => useManagerClients());
    await act(async () => {
      await result.current.load();
    });

    await act(async () => {
      await result.current.handleUnassign("client-1", "Ada Lovelace");
    });

    expect(
      mock.history.delete?.some((r) => r.url === "/portfolio-manager/clients/client-1")
    ).toBe(true);
    expect(result.current.unassigning).toBeNull();

    window.confirm = originalConfirm;
  });
});
