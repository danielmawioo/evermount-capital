import { CreditAmountSchema } from "./schemas";

describe("CreditAmountSchema", () => {
  it("accepts a positive amount", () => {
    expect(CreditAmountSchema.safeParse(50).success).toBe(true);
  });

  it("rejects zero", () => {
    expect(CreditAmountSchema.safeParse(0).success).toBe(false);
  });

  it("rejects a negative amount", () => {
    expect(CreditAmountSchema.safeParse(-10).success).toBe(false);
  });

  it("rejects NaN (e.g. from an empty or non-numeric input)", () => {
    expect(CreditAmountSchema.safeParse(NaN).success).toBe(false);
  });
});
