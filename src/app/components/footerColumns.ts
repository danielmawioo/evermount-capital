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

export const marketsColumn: FooterColumnData = {
  title: "Markets",
  // Note: pre-existing markup has a redundant "dark:text-gray-900" here
  // (overridden by the following dark:text-white); preserved as-is.
  headingClassName:
    "text-gray-900 dark:text-gray-900 dark:text-white font-semibold mb-5 text-base",
  links: [
    { label: "Evermount CFDs", href: "#", className: dupHoverClass },
    { label: "Future Markets", href: "#", className: dupHoverClass },
  ],
};

export const educationColumn: FooterColumnData = {
  title: "Education",
  headingClassName,
  links: [
    {
      label: "Investor Tour",
      href: "/investor-tour",
      className: dupHoverClass,
    },
    { label: "AI Trading Guide", href: "#", className: dupHoverClass },
    { label: "Growth Dashboard", href: "#", className: dupHoverClass },
    { label: "Insights Blog", href: "#", className: dupHoverClass },
  ],
};

export const importantLinksColumn: FooterColumnData = {
  title: "Important Links",
  headingClassName,
  links: [
    { label: "FAQs", href: "#", className: dupHoverClass },
    { label: "Partnerships", href: "#", className: dupHoverClass },
    { label: "Investor Events", href: "#", className: dupHoverClass },
    { label: "Risk Disclosure", href: "#", className: dupHoverClass },
  ],
};

export const legalComplianceColumn: FooterColumnData = {
  title: "Legal & Compliance",
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

export const communityColumn: FooterColumnData = {
  title: "Community",
  headingClassName,
  links: [
    { label: "Local Communities", href: "#", className: dupHoverClass },
    { label: "Join Discord", href: "#", className: dupHoverClass },
    { label: "Join X", href: "#", className: dupHoverClass },
  ],
};
