import type { ComponentType } from "react";
import {
  ChartBarIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  BookOpenIcon,
  CpuChipIcon,
  PresentationChartLineIcon,
  GlobeAltIcon,
  BoltIcon,
  CodeBracketIcon,
  ServerStackIcon,
  BriefcaseIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export interface NavSubItem {
  label: string;
  description: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export interface NavItem {
  label: string;
  href: string;
  submenu?: NavSubItem[];
}

export const navItems: NavItem[] = [
  {
    label: "Platform",
    href: "/platform",
    submenu: [
      {
        label: "Market Data",
        description: "Real-time and historical market data infrastructure",
        href: "/platform#market-data",
        icon: ChartBarIcon,
      },
      {
        label: "Quant Research",
        description: "Modeling, simulation and backtesting infrastructure",
        href: "/platform#quantitative-research",
        icon: PresentationChartLineIcon,
      },
      {
        label: "AI & Analytics",
        description: "Intelligence, signals and analytics systems",
        href: "/platform#ai-intelligence",
        icon: CpuChipIcon,
      },
      {
        label: "Execution",
        description: "Order management and execution infrastructure",
        href: "/platform#execution",
        icon: BoltIcon,
      },
      {
        label: "Risk",
        description: "Exposure, limits, monitoring and stress testing",
        href: "/platform#risk",
        icon: ShieldCheckIcon,
      },
      {
        label: "Portfolio Infrastructure",
        description: "Construction, attribution and performance analytics",
        href: "/platform#portfolio",
        icon: ServerStackIcon,
      },
    ],
  },
  {
    label: "Markets",
    href: "/markets",
    submenu: [
      {
        label: "Equities",
        description: "Infrastructure for equity markets",
        href: "/markets#equities",
        icon: ChartBarIcon,
      },
      {
        label: "FX",
        description: "Infrastructure for foreign exchange markets",
        href: "/markets#fx",
        icon: GlobeAltIcon,
      },
      {
        label: "Fixed Income",
        description: "Infrastructure for rates, bonds and credit",
        href: "/markets#fixed-income",
        icon: PresentationChartLineIcon,
      },
      {
        label: "Commodities",
        description: "Infrastructure for commodity markets",
        href: "/markets#commodities",
        icon: BoltIcon,
      },
      {
        label: "Derivatives",
        description: "Infrastructure for futures, options and related markets",
        href: "/markets#derivatives",
        icon: ShieldCheckIcon,
      },
      {
        label: "Digital Assets",
        description: "Infrastructure for digital asset markets where supported",
        href: "/markets#digital-assets",
        icon: CpuChipIcon,
      },
    ],
  },
  {
    label: "Institutions",
    href: "/institutions",
    submenu: [
      {
        label: "Banks",
        description:
          "Market data, analytics, risk and execution infrastructure",
        href: "/institutions#banks",
        icon: BuildingOfficeIcon,
      },
      {
        label: "Brokers",
        description: "Connectivity, execution and risk infrastructure",
        href: "/institutions#brokers",
        icon: BoltIcon,
      },
      {
        label: "Asset Managers",
        description: "Research, portfolio analytics and risk tooling",
        href: "/institutions#asset-managers",
        icon: BriefcaseIcon,
      },
      {
        label: "Exchanges",
        description: "Market infrastructure and technology integrations",
        href: "/institutions#exchanges",
        icon: GlobeAltIcon,
      },
      {
        label: "Market Makers",
        description: "High-performance data, research and risk systems",
        href: "/institutions#market-makers",
        icon: ChartBarIcon,
      },
      {
        label: "Fintechs",
        description: "APIs and infrastructure for product teams",
        href: "/institutions#fintechs",
        icon: CpuChipIcon,
      },
      {
        label: "Trading Firms",
        description: "Quantitative research, data, execution and risk",
        href: "/institutions#trading-firms",
        icon: PresentationChartLineIcon,
      },
    ],
  },
  {
    label: "Developers",
    href: "/developers",
    submenu: [
      {
        label: "API",
        description: "Programmatic access to Evermount infrastructure",
        href: "/developers#apis",
        icon: CodeBracketIcon,
      },
      {
        label: "Documentation",
        description: "Guides, authentication and examples",
        href: "/developers#documentation",
        icon: BookOpenIcon,
      },
      {
        label: "SDKs",
        description: "Client libraries — several coming soon",
        href: "/developers#sdks",
        icon: CpuChipIcon,
      },
      {
        label: "Sandbox",
        description: "Non-production access for integration testing",
        href: "/developers#sandbox",
        icon: ServerStackIcon,
      },
      {
        label: "Developer Portal",
        description: "Keys, rate limits and integration resources",
        href: "/developers",
        icon: CodeBracketIcon,
      },
      {
        label: "System Status",
        description: "Service availability — coming soon",
        href: "/developers#status",
        icon: ShieldCheckIcon,
      },
    ],
  },
  {
    label: "Research",
    href: "/research",
    submenu: [
      {
        label: "Quantitative Research",
        description: "Research infrastructure and methods",
        href: "/research#quantitative-research",
        icon: PresentationChartLineIcon,
      },
      {
        label: "Market Intelligence",
        description: "Market structure and intelligence notes",
        href: "/research#market-intelligence",
        icon: ChartBarIcon,
      },
      {
        label: "Insights",
        description: "Technical publications and research notes",
        href: "/research",
        icon: BookOpenIcon,
      },
    ],
  },
  {
    label: "Company",
    href: "/about",
    submenu: [
      {
        label: "About",
        description: "Mission, vision and principles",
        href: "/about",
        icon: BuildingOfficeIcon,
      },
      {
        label: "Careers",
        description: "Teams building financial infrastructure",
        href: "/careers",
        icon: BriefcaseIcon,
      },
      {
        label: "Partners",
        description: "Build the financial ecosystem with Evermount",
        href: "/partners",
        icon: GlobeAltIcon,
      },
      {
        label: "Contact",
        description: "Talk with the Evermount team",
        href: "/book-demo",
        icon: EnvelopeIcon,
      },
    ],
  },
];
