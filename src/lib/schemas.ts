import { z } from "zod";

export const CreditAmountSchema = z
  .number({ error: "Enter a valid amount" })
  .positive("Amount must be greater than zero")
  .finite("Enter a valid amount");

/**
 * Shared "valid positive amount" check used by deposit/withdraw forms,
 * which all show the same single message for any invalid input.
 */
export const PositiveAmountSchema = z
  .number({ error: "Please enter a valid amount" })
  .positive("Please enter a valid amount")
  .finite("Please enter a valid amount");

export function minimumAmountSchema(minimum: number, message: string) {
  return PositiveAmountSchema.min(minimum, message);
}
