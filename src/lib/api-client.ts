import { apiClient } from "./api/client";
import { auth } from "./api/auth";
import { users } from "./api/users";
import { kyc } from "./api/kyc";
import { wallets } from "./api/wallets";
import { deposits } from "./api/deposits";
import { withdrawals } from "./api/withdrawals";
import { investments } from "./api/investments";
import { portfolio } from "./api/portfolio";
import { transactions } from "./api/transactions";
import { dashboard } from "./api/dashboard";
import { risk } from "./api/risk";
import { documents } from "./api/documents";
import { demo } from "./api/demo";
import { newsletter } from "./api/newsletter";
import { ops } from "./api/ops";
import { portfolioManager } from "./api/portfolio-manager";
import { security } from "./api/security";
import { statements } from "./api/statements";
import { compliance } from "./api/compliance";
import { admin } from "./api/admin";

export const api = {
  auth,
  users,
  kyc,
  wallets,
  deposits,
  withdrawals,
  investments,
  portfolio,
  transactions,
  dashboard,
  risk,
  documents,
  demo,
  newsletter,
  ops,
  portfolioManager,
  security,
  statements,
  compliance,
  admin,
};

export default apiClient;
