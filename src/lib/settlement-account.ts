/** Receiving account for Visa/Mastercard and bank transfer deposits */
export const SETTLEMENT_ACCOUNT = {
  bankName: "Equity Bank Kenya",
  accountNumber: "0110166613478",
  branch: "Kenya",
  swiftCode: "EQBLKENA",
  country: "Kenya",
  cardMasked: "5235 2301 **** 1064",
} as const;

export function formatSettlementDetails(): string {
  const { bankName, accountNumber, branch, swiftCode, cardMasked } =
    SETTLEMENT_ACCOUNT;
  return [
    `Bank Name: ${bankName}`,
    `Account Number: ${accountNumber}`,
    `Card (Visa/Mastercard): ${cardMasked}`,
    `Branch: ${branch}`,
    `SWIFT: ${swiftCode}`,
  ].join("\n");
}
