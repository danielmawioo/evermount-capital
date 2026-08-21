import { z } from "zod";

export const CreditAmountSchema = z
  .number({ error: "Enter a valid amount" })
  .positive("Amount must be greater than zero")
  .finite("Enter a valid amount");
