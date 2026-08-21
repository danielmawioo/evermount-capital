import { formatSettlementDetails, SETTLEMENT_ACCOUNT } from "./settlement-account";

describe("formatSettlementDetails", () => {
  it("formats the settlement details as labeled lines", () => {
    const result = formatSettlementDetails();
    expect(result).toBe(
      [
        `Bank Name: ${SETTLEMENT_ACCOUNT.bankName}`,
        `Account Number: ${SETTLEMENT_ACCOUNT.accountNumber}`,
        `Card (Visa/Mastercard): ${SETTLEMENT_ACCOUNT.cardMasked}`,
        `Branch: ${SETTLEMENT_ACCOUNT.branch}`,
        `SWIFT: ${SETTLEMENT_ACCOUNT.swiftCode}`,
      ].join("\n")
    );
  });

  it("includes every settlement field exactly once", () => {
    const result = formatSettlementDetails();
    expect(result.split("\n")).toHaveLength(5);
    expect(result).toContain(SETTLEMENT_ACCOUNT.bankName);
    expect(result).toContain(SETTLEMENT_ACCOUNT.accountNumber);
    expect(result).toContain(SETTLEMENT_ACCOUNT.swiftCode);
  });
});
