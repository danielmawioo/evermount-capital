import {
  formatCurrency,
  formatPct,
  formatStatusLabel,
  getStatusBadgeClass,
  getTransactionIcon,
  getTransactionTypeLabel,
  isCreditTransaction,
} from "./format";

describe("format", () => {
  it("formats USD with two fraction digits by default", () => {
    expect(formatCurrency(50, "USD")).toBe("$50.00");
  });

  it("formats with zero fraction digits when requested", () => {
    expect(formatCurrency(1000, "USD", { maximumFractionDigits: 0 })).toBe(
      "$1,000",
    );
  });

  it("maps known statuses to badge classes and capitalizes labels", () => {
    expect(getStatusBadgeClass("pending")).toContain("yellow");
    expect(getStatusBadgeClass("unknown")).toContain("gray");
    expect(formatStatusLabel("pending")).toBe("Pending");
  });

  it("labels transaction types and credit direction", () => {
    expect(getTransactionTypeLabel("profit-withdrawal")).toBe(
      "Profit Withdrawal",
    );
    expect(getTransactionTypeLabel("custom")).toBe("Custom");
    expect(getTransactionIcon("deposit")).toBe("↓");
    expect(getTransactionIcon("withdrawal")).toBe("↑");
    expect(getTransactionIcon("other")).toBe("•");
    expect(isCreditTransaction("deposit")).toBe(true);
    expect(isCreditTransaction("investment")).toBe(false);
  });

  it("formats percentages with an explicit plus for positive values", () => {
    expect(formatPct(1.2)).toBe("+1.20%");
    expect(formatPct(-0.5, 1)).toBe("-0.5%");
    expect(formatPct(0)).toBe("0.00%");
  });
});
