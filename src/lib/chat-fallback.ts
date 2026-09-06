import { CHAT_DEPARTMENT_MAP } from "./chat-departments";

const BASE_URL = "https://www.evermount.co";

type FallbackEntry = {
  keywords: string[];
  answer: string;
};

const DEPARTMENT_FALLBACKS: Record<string, FallbackEntry[]> = {
  payments: [
    {
      keywords: ["deposit", "fund", "add money", "top up"],
      answer: `To deposit funds:\n1. Go to ${BASE_URL}/dashboard/deposit\n2. Choose your method — M-Pesa (${BASE_URL}/dashboard/deposit/mpesa), card (${BASE_URL}/dashboard/deposit/card), bank (${BASE_URL}/dashboard/deposit/bank), or crypto (${BASE_URL}/dashboard/deposit/crypto)\n3. M-Pesa minimum is KES 10; card minimum is $10\n4. Track status at ${BASE_URL}/dashboard/wallets and ${BASE_URL}/dashboard/transactions\n\nBank transfers take 1–3 business days; card and crypto are usually instant.`,
    },
    {
      keywords: ["withdraw", "withdrawal", "cash out", "payout"],
      answer: `To withdraw funds:\n1. Go to ${BASE_URL}/dashboard/withdraw\n2. Select M-Pesa (${BASE_URL}/dashboard/withdraw/mpesa), bank (${BASE_URL}/dashboard/withdraw/bank), or crypto (${BASE_URL}/dashboard/withdraw/crypto)\n3. Ensure KYC is complete at ${BASE_URL}/dashboard/kyc\n4. M-Pesa is usually instant; bank transfers take 1–5 business days\n\nLarge withdrawals may require additional review — contact payments@evermount.co.`,
    },
    {
      keywords: ["fee", "fees", "charge", "cost", "pricing"],
      answer: `Evermount fees:\n• 2% annual management fee\n• 20% performance fee above the high-water mark\n• No deposit/withdrawal fees for most methods\n\nFull details: ${BASE_URL}/pricing\nTransaction history: ${BASE_URL}/dashboard/transactions`,
    },
    {
      keywords: ["pending", "delay", "not showing", "transaction"],
      answer: `If a transaction is pending or missing:\n1. Check ${BASE_URL}/dashboard/transactions and ${BASE_URL}/dashboard/wallets/history\n2. Bank deposits take 1–3 business days; card/crypto are usually instant\n3. Allow up to 24 hours for processing\n\nStill unresolved? Email payments@evermount.co with your transaction reference.`,
    },
  ],
  technical: [
    {
      keywords: ["load", "blank", "not working", "broken", "crash", "error"],
      answer: `Try these steps:\n1. Clear browser cache and try incognito mode\n2. Use Chrome, Firefox, Safari, or Edge (latest 2 versions)\n3. Log out and back in at ${BASE_URL}/login\n4. Disable browser extensions and check your connection\n\nTell me which page (e.g. ${BASE_URL}/dashboard/portfolio) and the exact error if it persists.`,
    },
    {
      keywords: ["api", "developer", "integration"],
      answer: `API access:\n• Documentation: ${BASE_URL}/platform\n• Base URL: api.evermount.co\n• Authentication: JWT bearer token required\n\nFor API issues, email support@evermount.co with subject "Technical Support".`,
    },
    {
      keywords: ["slow", "performance", "lag"],
      answer: `If the platform is slow:\n1. Check your internet connection\n2. Disable browser extensions\n3. Try a different network or device\n4. Refresh the page — portfolio data loads on page open\n\nWallet updates use WebSocket; a refresh at ${BASE_URL}/dashboard/wallets usually helps.`,
    },
  ],
  "it-support": [
    {
      keywords: ["login", "log in", "sign in", "can't access"],
      answer: `Can't log in?\n1. Go to ${BASE_URL}/login and verify your email\n2. Use "Forgot password" at ${BASE_URL}/forgot-password\n3. New accounts: verify email at ${BASE_URL}/verify-email\n4. Locked out? Wait 15 minutes, then retry\n\nStill blocked? Contact support@evermount.co.`,
    },
    {
      keywords: ["password", "reset", "forgot"],
      answer: `Password reset:\n1. Visit ${BASE_URL}/forgot-password\n2. Enter your registered email\n3. Check inbox and spam for the reset link\n4. Complete the reset at ${BASE_URL}/reset-password`,
    },
    {
      keywords: ["2fa", "two-factor", "authenticator", "security"],
      answer: `Two-factor authentication:\n• Enable at ${BASE_URL}/dashboard/setting → Security\n• Locked out of 2FA? Contact security@evermount.co with ID verification\n• Suspicious activity? Email security@evermount.co immediately and change your password.`,
    },
  ],
  compliance: [
    {
      keywords: ["kyc", "verify", "verification", "identity"],
      answer: `KYC verification:\n1. Go to ${BASE_URL}/dashboard/kyc\n2. Submit government-issued photo ID and proof of address (utility bill or bank statement, less than 3 months old)\n3. Review takes 1–2 business days\n4. Required before deposits and withdrawals\n\nRejected? Check your email for the reason and resubmit at ${BASE_URL}/dashboard/kyc.`,
    },
    {
      keywords: ["reject", "rejected", "failed", "denied"],
      answer: `If KYC was rejected:\n1. Check your email for the rejection reason\n2. Common issues: blurry documents, expired ID, name mismatch\n3. Resubmit corrected documents at ${BASE_URL}/dashboard/kyc\n\nQuestions? Email compliance@evermount.co.`,
    },
    {
      keywords: ["aml", "regulation", "legal", "document"],
      answer: `Regulatory resources:\n• AML policy: ${BASE_URL}/aml-policy\n• Regulatory compliance: ${BASE_URL}/regulatory-compliance\n• Risk disclosure: ${BASE_URL}/risk-disclosure\n• Terms: ${BASE_URL}/terms | Privacy: ${BASE_URL}/privacy\n\nLegal questions: compliance@evermount.co`,
    },
  ],
  trading: [
    {
      keywords: ["performance", "return", "profit", "portfolio"],
      answer: `Portfolio performance:\n• View holdings at ${BASE_URL}/dashboard/portfolio\n• Returns use time-weighted methodology (accounts for deposits/withdrawals)\n• Analytics: ${BASE_URL}/portfolio-insights\n• Risk metrics: ${BASE_URL}/dashboard/risk\n\nPast performance does not guarantee future results.`,
    },
    {
      keywords: ["strategy", "strategies", "invest", "allocate", "fund"],
      answer: `Investing in strategies:\n1. Browse funds at ${BASE_URL}/dashboard/funds or ${BASE_URL}/dashboard/invest\n2. Minimum investment is approximately $1,000\n3. Strategy details: ${BASE_URL}/features and ${BASE_URL}/platform\n4. Rebalance at ${BASE_URL}/dashboard/portfolio\n\nPersonalized review: ${BASE_URL}/book-demo`,
    },
  ],
  account: [
    {
      keywords: ["profile", "update", "name", "email", "phone", "setting"],
      answer: `Update your profile:\n1. Go to ${BASE_URL}/dashboard/setting\n2. Update name, email, phone, or address\n3. Some changes require email verification\n4. Change password under Security\n\nStatements: ${BASE_URL}/dashboard/statements`,
    },
    {
      keywords: ["close", "delete", "deactivate"],
      answer: `To close your account:\n1. Withdraw all funds first at ${BASE_URL}/dashboard/withdraw\n2. Close any open positions\n3. Email support@evermount.co with subject "Account Closure"\n\nWe'll confirm once processing is complete.`,
    },
  ],
  general: [
    {
      keywords: ["start", "begin", "new", "register", "sign up", "how do i"],
      answer: `Getting started:\n1. Register at ${BASE_URL}/register\n2. Verify email at ${BASE_URL}/verify-email\n3. Complete KYC at ${BASE_URL}/dashboard/kyc\n4. Deposit at ${BASE_URL}/dashboard/deposit\n5. Invest at ${BASE_URL}/dashboard/invest\n6. Take the tour: ${BASE_URL}/platform-tour`,
    },
    {
      keywords: ["service", "offer", "what is", "about"],
      answer: `Evermount builds financial infrastructure for market data, quantitative research, intelligence, risk and execution.\n\nLearn more:\n• Platform: ${BASE_URL}/platform\n• Developers: ${BASE_URL}/developers\n• Pricing: ${BASE_URL}/pricing\n• Request access: ${BASE_URL}/book-demo`,
    },
    {
      keywords: ["contact", "reach", "email", "phone", "support"],
      answer: `Contact us:\n• General: info@evermount.co\n• Support: support@evermount.co\n• Phone: +254758578816 (Mon–Fri, 9 AM–5 PM EAT)\n• Book a demo: ${BASE_URL}/book-demo\n• Help center: ${BASE_URL}/dashboard/help`,
    },
  ],
};

function scoreMatch(message: string, keywords: string[]): number {
  const lower = message.toLowerCase();
  return keywords.reduce(
    (score, kw) => (lower.includes(kw) ? score + kw.length : score),
    0,
  );
}

export function getChatFallbackResponse(
  departmentId: string,
  assistantName: string,
  userMessage: string,
): string {
  const dept = CHAT_DEPARTMENT_MAP[departmentId];
  if (!dept) {
    return `I'm ${assistantName}. Please contact support@evermount.co for assistance.`;
  }

  const entries = DEPARTMENT_FALLBACKS[departmentId] ?? [];
  let best: FallbackEntry | undefined;
  let bestScore = 0;

  for (const entry of entries) {
    const score = scoreMatch(userMessage, entry.keywords);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (best) {
    return `Hi! I'm ${assistantName} from ${dept.name}. Here's how I can help:\n\n${best.answer}\n\nIf this doesn't resolve your issue, email ${dept.escalationEmail}.`;
  }

  const prompts = dept.suggestedPrompts
    .map((p, i) => `${i + 1}. ${p}`)
    .join("\n");

  return `Hi! I'm ${assistantName} from ${dept.name}. I handle ${dept.description.toLowerCase()}.\n\nCommon questions I can help with:\n${prompts}\n\nAsk me a specific question, or email ${dept.escalationEmail} for direct support.`;
}

export function extractLinks(text: string): string[] {
  const linkRegex = /https?:\/\/[^\s)]+/g;
  return text.match(linkRegex) ?? [];
}
