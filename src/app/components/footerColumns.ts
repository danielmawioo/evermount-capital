export interface FooterLink {
  label: string;
  href: string;
  className: string;
}

export interface FooterColumnData {
  title: string;
  headingClassName: string;
  links: FooterLink[];
}

const hoverClass =
  "hover:text-gray-900 dark:hover:text-white transition-colors";
const headingClassName =
  "text-gray-900 dark:text-white font-semibold mb-5 text-base";

export const platformColumn: FooterColumnData = {
  title: "Platform",
  headingClassName,
  links: [
    {
      label: "Market Data",
      href: "/platform#market-data",
      className: hoverClass,
    },
    {
      label: "Quant Research",
      href: "/platform#quantitative-research",
      className: hoverClass,
    },
    {
      label: "AI & Analytics",
      href: "/platform#ai-intelligence",
      className: hoverClass,
    },
    { label: "Execution", href: "/platform#execution", className: hoverClass },
    { label: "Risk", href: "/platform#risk", className: hoverClass },
    {
      label: "Portfolio Infrastructure",
      href: "/platform#portfolio",
      className: hoverClass,
    },
  ],
};

export const marketsColumn: FooterColumnData = {
  title: "Markets",
  headingClassName,
  links: [
    { label: "Equities", href: "/markets#equities", className: hoverClass },
    { label: "FX", href: "/markets#fx", className: hoverClass },
    {
      label: "Fixed Income",
      href: "/markets#fixed-income",
      className: hoverClass,
    },
    {
      label: "Commodities",
      href: "/markets#commodities",
      className: hoverClass,
    },
    {
      label: "Derivatives",
      href: "/markets#derivatives",
      className: hoverClass,
    },
    {
      label: "Digital Assets",
      href: "/markets#digital-assets",
      className: hoverClass,
    },
  ],
};

export const institutionsColumn: FooterColumnData = {
  title: "Institutions",
  headingClassName,
  links: [
    { label: "Banks", href: "/institutions#banks", className: hoverClass },
    { label: "Brokers", href: "/institutions#brokers", className: hoverClass },
    {
      label: "Asset Managers",
      href: "/institutions#asset-managers",
      className: hoverClass,
    },
    {
      label: "Exchanges",
      href: "/institutions#exchanges",
      className: hoverClass,
    },
    {
      label: "Market Makers",
      href: "/institutions#market-makers",
      className: hoverClass,
    },
    {
      label: "Fintechs",
      href: "/institutions#fintechs",
      className: hoverClass,
    },
    {
      label: "Trading Firms",
      href: "/institutions#trading-firms",
      className: hoverClass,
    },
  ],
};

export const developersColumn: FooterColumnData = {
  title: "Developers",
  headingClassName,
  links: [
    { label: "Request Access", href: "/developers", className: hoverClass },
    {
      label: "Gold GEX",
      href: "/research#gold-gex",
      className: hoverClass,
    },
    {
      label: "Documentation",
      href: "/developers#documentation",
      className: hoverClass,
    },
    { label: "API Terms", href: "/api-terms", className: hoverClass },
  ],
};

export const researchColumn: FooterColumnData = {
  title: "Research",
  headingClassName,
  links: [
    { label: "Research", href: "/research", className: hoverClass },
    {
      label: "Gold GEX",
      href: "/research#gold-gex",
      className: hoverClass,
    },
  ],
};

export const companyColumn: FooterColumnData = {
  title: "Company",
  headingClassName,
  links: [
    { label: "About", href: "/about", className: hoverClass },
    { label: "Careers", href: "/careers", className: hoverClass },
    { label: "Partners", href: "/partners", className: hoverClass },
    { label: "Contact", href: "/book-demo", className: hoverClass },
    { label: "Capital", href: "/capital", className: hoverClass },
  ],
};

export const legalComplianceColumn: FooterColumnData = {
  title: "Legal",
  headingClassName,
  links: [
    { label: "Terms", href: "/terms", className: hoverClass },
    { label: "Privacy", href: "/privacy", className: hoverClass },
    {
      label: "Risk Disclosure",
      href: "/risk-disclosure",
      className: hoverClass,
    },
    { label: "Data Policy", href: "/data-policy", className: hoverClass },
    { label: "API Terms", href: "/api-terms", className: hoverClass },
    {
      label: "Compliance",
      href: "/regulatory-compliance",
      className: hoverClass,
    },
  ],
};
