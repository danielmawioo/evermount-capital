"use client";

import Link from "next/link";
import { useState } from "react";
import { FaLinkedinIn, FaTiktok, FaDiscord, FaXTwitter } from "react-icons/fa6";
import { api } from "@/lib/api-client";
import { logger } from "@/lib/logger";
import { EmailSchema } from "@/lib/schemas";
import FooterColumn from "./FooterColumn";
import {
  platformColumn,
  marketsColumn,
  institutionsColumn,
  developersColumn,
  researchColumn,
  companyColumn,
  legalComplianceColumn,
  type FooterColumnData,
} from "./footerColumns";
import { useLocale } from "@/context/LocaleContext";
import LanguageSwitcher from "./LanguageSwitcher";

const COLUMN_KEYS: Record<string, string> = {
  Platform: "nav.platform",
  Markets: "nav.markets",
  Institutions: "nav.institutions",
  Developers: "nav.developers",
  Research: "nav.research",
  Company: "nav.company",
  Legal: "footer.legal",
};

const LINK_KEYS: Record<string, string> = {
  "Market Data": "nav.marketData",
  "Quant Research": "nav.quantResearch",
  "AI & Analytics": "nav.aiAnalytics",
  Execution: "nav.execution",
  Risk: "nav.risk",
  "Portfolio Infrastructure": "nav.portfolio",
  Equities: "nav.equities",
  FX: "nav.fx",
  "Fixed Income": "nav.fixedIncome",
  Commodities: "nav.commodities",
  Derivatives: "nav.derivatives",
  "Digital Assets": "nav.digitalAssets",
  Banks: "nav.banks",
  Brokers: "nav.brokers",
  "Asset Managers": "nav.assetManagers",
  Exchanges: "nav.exchanges",
  "Market Makers": "nav.marketMakers",
  Fintechs: "nav.fintechs",
  "Trading Firms": "nav.tradingFirms",
  API: "nav.api",
  Documentation: "nav.documentation",
  SDKs: "nav.sdks",
  Sandbox: "nav.sandbox",
  Status: "nav.status",
  Research: "nav.research",
  "Market Intelligence": "nav.marketIntelligence",
  Insights: "nav.insights",
  About: "nav.about",
  Careers: "nav.careers",
  Partners: "nav.partners",
  Contact: "nav.contact",
  Terms: "footer.terms",
  Privacy: "footer.privacy",
  "Risk Disclosure": "footer.riskDisclosure",
  "Data Policy": "footer.dataPolicy",
  "API Terms": "footer.apiTerms",
  "Request Access": "common.requestAccess",
  "Gold GEX": "nav.goldGex",
  Capital: "nav.capital",
  Compliance: "footer.compliance",
};

function translateColumn(
  column: FooterColumnData,
  t: (key: string) => string,
): FooterColumnData {
  return {
    ...column,
    title: t(COLUMN_KEYS[column.title] ?? column.title),
    links: column.links.map((link) => ({
      ...link,
      label: t(LINK_KEYS[link.label] ?? link.label),
    })),
  };
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLocale();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EmailSchema.safeParse(email).success) return;

    try {
      await api.newsletter.subscribe({ email });
      setSubmitted(true);
      setEmail("");
    } catch (error) {
      logger.error("Newsletter submission error", error);
    }
  };

  return (
    <footer className="bg-gray-100 text-gray-600 dark:bg-[#0e0e1a] dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="pt-16 pb-12">
          {/* Grid Sections */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-8 lg:gap-10 text-sm mb-16">
            <FooterColumn {...translateColumn(platformColumn, t)} />
            <FooterColumn {...translateColumn(marketsColumn, t)} />
            <FooterColumn {...translateColumn(institutionsColumn, t)} />
            <FooterColumn {...translateColumn(developersColumn, t)} />
            <FooterColumn {...translateColumn(researchColumn, t)} />
            <FooterColumn {...translateColumn(companyColumn, t)} />
            <FooterColumn {...translateColumn(legalComplianceColumn, t)} />
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-5 text-base">
                {t("footer.contactUs")}
              </h4>
              <ul className="space-y-3">
                <li>
                  <span className="text-gray-500">{t("footer.email")} </span>
                  <a
                    href="mailto:info@evermount.co"
                    className="hover:text-[#00a76f] transition-colors"
                  >
                    info@evermount.co
                  </a>
                </li>
                <li>
                  <span className="text-gray-500">{t("footer.phone")} </span>
                  <a
                    href="tel:+254758578816"
                    className="hover:text-[#00a76f] transition-colors"
                  >
                    +254 758 578 816
                  </a>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-gray-900 dark:hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {t("footer.liveChat")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-gray-900 dark:hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {t("footer.messenger")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mb-16 text-center">
            <h4 className="text-xl text-gray-900 dark:text-white font-semibold mb-3">
              {t("footer.newsletterTitle")}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {t("footer.newsletterBody")}
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-lg w-full sm:flex-1 text-sm text-gray-900 dark:text-white placeholder-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00a76f] focus:border-transparent transition"
                required
              />
              <button
                type="submit"
                className="bg-[#00a76f] hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium transition w-full sm:w-auto"
              >
                {submitted ? t("footer.subscribed") : t("footer.subscribe")}
              </button>
            </form>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl">
              {t("footer.disclaimer")}
            </p>
            <div className="flex justify-center gap-6 text-[#00a76f] text-xl">
              {[
                {
                  href: "https://x.com/evermount",
                  icon: <FaXTwitter />,
                  label: "X Twitter",
                },
                {
                  href: "https://linkedin.com/company/evermount",
                  icon: <FaLinkedinIn />,
                  label: "LinkedIn",
                },
                {
                  href: "https://tiktok.com/@evermount",
                  icon: <FaTiktok />,
                  label: "TikTok",
                },
                {
                  href: "https://discord.gg/evermount",
                  icon: <FaDiscord />,
                  label: "Discord",
                },
              ].map(({ href, icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  aria-label={label}
                  className="hover:scale-110 transition-transform duration-200"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 dark:border-gray-800 pt-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <LanguageSwitcher align="right" />
        </div>
      </div>
    </footer>
  );
}
