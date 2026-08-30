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

const dupHoverClass =
  "hover:text-gray-900 dark:hover:text-gray-900 dark:hover:text-white transition-colors";
const hoverClass =
  "hover:text-gray-900 dark:hover:text-white transition-colors";
const headingClassName =
  "text-gray-900 dark:text-white font-semibold mb-5 text-base";

export const platformColumn: FooterColumnData = {
  title: "Platform",
  headingClassName,
  links: [
    {
      label: "AI Intelligence",
      href: "/#evermount-ai",
      className: dupHoverClass,
    },
    {
      label: "Quant Research",
      href: "/#quant-research",
      className: dupHoverClass,
    },
    {
      label: "Market Data",
      href: "/#platform-systems",
      className: dupHoverClass,
    },
    {
      label: "Risk Intelligence",
      href: "/#quant-research",
      className: dupHoverClass,
    },
    {
      label: "Execution Infrastructure",
      href: "/platform",
      className: dupHoverClass,
    },
  ],
};

export const marketsColumn: FooterColumnData = {
  title: "Markets",
  headingClassName:
    "text-gray-900 dark:text-gray-900 dark:text-white font-semibold mb-5 text-base",
  links: [
    { label: "African Markets", href: "/#markets", className: dupHoverClass },
    { label: "Future Markets", href: "/#markets", className: dupHoverClass },
    {
      label: "Market Infrastructure",
      href: "/#markets",
      className: dupHoverClass,
    },
  ],
};

export const companyColumn: FooterColumnData = {
  title: "Company",
  headingClassName,
  links: [
    { label: "About", href: "/about", className: dupHoverClass },
    { label: "Technology", href: "/#technology", className: dupHoverClass },
    { label: "Research", href: "/#quant-research", className: dupHoverClass },
    { label: "Careers", href: "/careers", className: dupHoverClass },
    { label: "Partnerships", href: "/book-demo", className: dupHoverClass },
    { label: "Contact", href: "/book-demo", className: dupHoverClass },
  ],
};

export const resourcesColumn: FooterColumnData = {
  title: "Resources",
  headingClassName,
  links: [
    { label: "Insights", href: "/investor-tour", className: dupHoverClass },
    { label: "Research", href: "/platform", className: dupHoverClass },
    { label: "AI Trading Guide", href: "/investor-tour", className: dupHoverClass },
    { label: "Documentation", href: "/platform", className: dupHoverClass },
  ],
};

export const legalComplianceColumn: FooterColumnData = {
  title: "Legal",
  headingClassName,
  links: [
    { label: "Terms of Service", href: "/terms", className: dupHoverClass },
    { label: "Privacy Policy", href: "/privacy", className: hoverClass },
    { label: "Cookie Policy", href: "/cookie-policy", className: hoverClass },
    {
      label: "Investment Agreement",
      href: "/investment-agreement",
      className: hoverClass,
    },
    {
      label: "Risk Disclosure",
      href: "/risk-disclosure",
      className: hoverClass,
    },
    { label: "AML Statement", href: "/aml-policy", className: hoverClass },
    {
      label: "Regulatory Compliance",
      href: "/regulatory-compliance",
      className: hoverClass,
    },
    {
      label: "Conflict of Interest",
      href: "/conflict-of-interest",
      className: hoverClass,
    },
    {
      label: "Best Execution Policy",
      href: "/best-execution",
      className: hoverClass,
    },
  ],
};
