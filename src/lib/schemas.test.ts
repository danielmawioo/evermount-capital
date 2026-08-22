import { CreditAmountSchema, PositiveAmountSchema, minimumAmountSchema } from "./schemas";

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

describe("PositiveAmountSchema", () => {
  it("accepts a positive amount", () => {
    expect(PositiveAmountSchema.safeParse(25).success).toBe(true);
  });

  it("rejects zero, negative, and NaN with the same message", () => {
    for (const value of [0, -5, NaN]) {
      const result = PositiveAmountSchema.safeParse(value);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Please enter a valid amount"
        );
      }
    }
  });
});

describe("minimumAmountSchema", () => {
  const schema = minimumAmountSchema(10, "Minimum deposit amount is KES 10");

  it("accepts an amount at or above the minimum", () => {
    expect(schema.safeParse(10).success).toBe(true);
    expect(schema.safeParse(50).success).toBe(true);
  });

  it("rejects an amount below the minimum with the custom message", () => {
    const result = schema.safeParse(5);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Minimum deposit amount is KES 10"
      );
    }
  });

  it("rejects a non-positive amount with the base message", () => {
    const result = schema.safeParse(-1);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Please enter a valid amount"
      );
    }
  });
});
