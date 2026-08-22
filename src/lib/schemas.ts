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

/** Shared email format check — used across auth, admin, and contact forms. */
export const EmailSchema = z.email("Enter a valid email address");

/** A trimmed, non-empty text field with a caller-supplied error message. */
export function requiredTextSchema(message: string) {
  return z.string().trim().min(1, message);
}

/** Password with a minimum length and a caller-supplied error message. */
export function minimumPasswordSchema(minLength: number, message: string) {
  return z.string().min(minLength, message);
}
