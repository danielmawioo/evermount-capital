import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { deposits } from "./deposits";

describe("deposits api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("getSettlementAccount resolves with settlement account details", async () => {
    const account = { accountNumber: "12345", bankName: "Test Bank" };
    mock.onGet("/deposits/settlement-account").reply(200, account);

    const response = await deposits.getSettlementAccount();

    expect(response.data).toEqual(account);
  });

  it("card posts card deposit data", async () => {
    const data = {
      amount: 100,
      currency: "USD",
      cardToken: "tok_123",
      saveCard: true,
    };
    mock.onPost("/deposits/card").reply(201, { id: "dep1" });

    const response = await deposits.card(data);

    expect(response.data).toEqual({ id: "dep1" });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });

  it("confirmStripe posts the payment intent id", async () => {
    const data = { paymentIntentId: "pi_123" };
    mock.onPost("/deposits/stripe/confirm").reply(200, { status: "succeeded" });

    const response = await deposits.confirmStripe(data);

    expect(response.data).toEqual({ status: "succeeded" });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });

  it("crypto posts crypto deposit data", async () => {
    const data = {
      amount: 0.5,
      currency: "BTC",
      walletAddress: "bc1qxyz",
    };
    mock.onPost("/deposits/crypto").reply(201, { id: "dep2" });

    const response = await deposits.crypto(data);

    expect(response.data).toEqual({ id: "dep2" });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });

  it("bank posts bank deposit data", async () => {
    const data = {
      amount: 500,
      currency: "USD",
      bankAccountId: "acc1",
      reference: "invoice-1",
    };
    mock.onPost("/deposits/bank").reply(201, { id: "dep3" });

    const response = await deposits.bank(data);

    expect(response.data).toEqual({ id: "dep3" });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });

  it("mpesa posts mpesa deposit data", async () => {
    const data = {
      amount: 1000,
      currency: "KES",
      phoneNumber: "254712345678",
    };
    mock.onPost("/deposits/mpesa").reply(201, { id: "dep4" });

    const response = await deposits.mpesa(data);

    expect(response.data).toEqual({ id: "dep4" });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });

  it("getStatus fetches a deposit by id", async () => {
    const deposit = { id: "dep1", status: "completed" };
    mock.onGet("/deposits/dep1").reply(200, deposit);

    const response = await deposits.getStatus("dep1");

    expect(response.data).toEqual(deposit);
    expect(mock.history.get[0].url).toBe("/deposits/dep1");
  });

  it("getAll sends params and resolves with deposits list", async () => {
    mock.onGet("/deposits").reply(200, { deposits: [] });

    const response = await deposits.getAll({
      status: "completed",
      page: 1,
      limit: 20,
    });

    expect(response.data).toEqual({ deposits: [] });
    expect(mock.history.get[0].params).toEqual({
      status: "completed",
      page: 1,
      limit: 20,
    });
  });

  it("getAll works without params", async () => {
    mock.onGet("/deposits").reply(200, { deposits: [] });

    const response = await deposits.getAll();

    expect(response.data).toEqual({ deposits: [] });
  });
});
