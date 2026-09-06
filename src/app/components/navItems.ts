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
  id: string;
  label: string;
  description: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  submenu?: NavSubItem[];
}

export const navItems: NavItem[] = [
  {
    id: "platform",
    label: "Platform",
    href: "/platform",
    submenu: [
      {
        id: "marketData",
        label: "Market Data",
        description: "Real-time and historical market data infrastructure",
        href: "/platform#market-data",
        icon: ChartBarIcon,
      },
      {
        id: "quantResearch",
        label: "Quant Research",
        description: "Modeling, simulation and backtesting infrastructure",
        href: "/platform#quantitative-research",
        icon: PresentationChartLineIcon,
      },
      {
        id: "aiAnalytics",
        label: "AI & Analytics",
        description: "Intelligence, signals and analytics systems",
        href: "/platform#ai-intelligence",
        icon: CpuChipIcon,
      },
      {
        id: "execution",
        label: "Execution",
        description: "Order management and execution infrastructure",
        href: "/platform#execution",
        icon: BoltIcon,
      },
      {
        id: "risk",
        label: "Risk",
        description: "Exposure, limits, monitoring and stress testing",
        href: "/platform#risk",
        icon: ShieldCheckIcon,
      },
      {
        id: "portfolio",
        label: "Portfolio Infrastructure",
        description: "Construction, attribution and performance analytics",
        href: "/platform#portfolio",
        icon: ServerStackIcon,
      },
    ],
  },
  {
    id: "markets",
    label: "Markets",
    href: "/markets",
    submenu: [
      {
        id: "equities",
        label: "Equities",
        description: "Infrastructure for equity markets",
        href: "/markets#equities",
        icon: ChartBarIcon,
      },
      {
        id: "fx",
        label: "FX",
        description: "Infrastructure for foreign exchange markets",
        href: "/markets#fx",
        icon: GlobeAltIcon,
      },
      {
        id: "fixedIncome",
        label: "Fixed Income",
        description: "Infrastructure for rates, bonds and credit",
        href: "/markets#fixed-income",
        icon: PresentationChartLineIcon,
      },
      {
        id: "commodities",
        label: "Commodities",
        description: "Infrastructure for commodity markets",
        href: "/markets#commodities",
        icon: BoltIcon,
      },
      {
        id: "derivatives",
        label: "Derivatives",
        description: "Infrastructure for futures, options and related markets",
        href: "/markets#derivatives",
        icon: ShieldCheckIcon,
      },
      {
        id: "digitalAssets",
        label: "Digital Assets",
        description: "Infrastructure for digital asset markets where supported",
        href: "/markets#digital-assets",
        icon: CpuChipIcon,
      },
    ],
  },
  {
    id: "institutions",
    label: "Institutions",
    href: "/institutions",
    submenu: [
      {
        id: "banks",
        label: "Banks",
        description:
          "Market data, analytics, risk and execution infrastructure",
        href: "/institutions#banks",
        icon: BuildingOfficeIcon,
      },
      {
        id: "brokers",
        label: "Brokers",
        description: "Connectivity, execution and risk infrastructure",
        href: "/institutions#brokers",
        icon: BoltIcon,
      },
      {
        id: "assetManagers",
        label: "Asset Managers",
        description: "Research, portfolio analytics and risk tooling",
        href: "/institutions#asset-managers",
        icon: BriefcaseIcon,
      },
      {
        id: "exchanges",
        label: "Exchanges",
        description: "Market infrastructure and technology integrations",
        href: "/institutions#exchanges",
        icon: GlobeAltIcon,
      },
      {
        id: "marketMakers",
        label: "Market Makers",
        description: "High-performance data, research and risk systems",
        href: "/institutions#market-makers",
        icon: ChartBarIcon,
      },
      {
        id: "fintechs",
        label: "Fintechs",
        description: "APIs and infrastructure for product teams",
        href: "/institutions#fintechs",
        icon: CpuChipIcon,
      },
      {
        id: "tradingFirms",
        label: "Trading Firms",
        description: "Quantitative research, data, execution and risk",
        href: "/institutions#trading-firms",
        icon: PresentationChartLineIcon,
      },
    ],
  },
  {
    id: "developers",
    label: "Developers",
    href: "/developers",
    submenu: [
      {
        id: "developerAccess",
        label: "Request Access",
        description: "Credentials after review — no public API catalog",
        href: "/developers",
        icon: CodeBracketIcon,
      },
      {
        id: "goldGex",
        label: "Gold GEX overlay",
        description: "Public subset of the GEX engine",
        href: "/research#gold-gex",
        icon: ChartBarIcon,
      },
      {
        id: "documentation",
        label: "Documentation",
        description: "Issued with approved access",
        href: "/developers#documentation",
        icon: BookOpenIcon,
      },
    ],
  },
  {
    id: "research",
    label: "Research",
    href: "/research",
    submenu: [
      {
        id: "goldGex",
        label: "Gold GEX",
        description: "Live or fixture gold market-structure levels",
        href: "/research#gold-gex",
        icon: ChartBarIcon,
      },
      {
        id: "insights",
        label: "Insights",
        description: "Research notes as they are published",
        href: "/research",
        icon: BookOpenIcon,
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    href: "/about",
    submenu: [
      {
        id: "about",
        label: "About",
        description: "Mission, vision and principles",
        href: "/about",
        icon: BuildingOfficeIcon,
      },
      {
        id: "careers",
        label: "Careers",
        description: "Teams building financial infrastructure",
        href: "/careers",
        icon: BriefcaseIcon,
      },
      {
        id: "partners",
        label: "Partners",
        description: "Build the financial ecosystem with Evermount",
        href: "/partners",
        icon: GlobeAltIcon,
      },
      {
        id: "contact",
        label: "Contact",
        description: "Talk with the Evermount team",
        href: "/book-demo",
        icon: EnvelopeIcon,
      },
    ],
  },
  {
    id: "capital",
    label: "Capital",
    href: "/capital",
  },
];
