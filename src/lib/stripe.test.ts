describe("stripe module", () => {
  const originalKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const originalFetch = global.fetch;

  afterEach(() => {
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = originalKey;
    global.fetch = originalFetch;
    jest.resetModules();
  });

  it("importing the module does not throw and exports the expected shape", async () => {
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = "pk_test_123";
    const mod = await import("./stripe");
    expect(typeof mod.getStripe).toBe("function");
    expect(typeof mod.createPaymentIntent).toBe("function");
  });

  it("getStripe returns null and logs an error when no publishable key is configured", async () => {
    delete process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    jest.resetModules();
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const mod = await import("./stripe");

    const result = mod.getStripe();

    expect(result).toBeNull();
    expect(consoleErrorSpy.mock.calls[0][0]).toMatchObject({
      level: "error",
      message: "Stripe publishable key not found",
    });
    consoleErrorSpy.mockRestore();
  });

  it("createPaymentIntent posts to the stripe intent endpoint and returns the JSON body", async () => {
    const mockJson = jest
      .fn()
      .mockResolvedValue({ clientSecret: "secret_123" });
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: mockJson });

    const mod = await import("./stripe");
    const result = await mod.createPaymentIntent(100, "USD");

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/stripe/create-intent",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ amount: 100, currency: "USD" }),
      }),
    );
    expect(result).toEqual({ clientSecret: "secret_123" });
  });

  it("createPaymentIntent throws when the response is not ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, json: jest.fn() });

    const mod = await import("./stripe");

    await expect(mod.createPaymentIntent(50)).rejects.toThrow(
      "Failed to create payment intent",
    );
  });
});
