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
        label: "AI Intelligence",
        description: "AI-native market and research intelligence",
        href: "/#evermount-ai",
        icon: CpuChipIcon,
      },
      {
        label: "Quant Research",
        description: "Strategy discovery, simulation and validation",
        href: "/#quant-research",
        icon: PresentationChartLineIcon,
      },
      {
        label: "Market Data",
        description: "Research-ready financial data infrastructure",
        href: "/#platform-systems",
        icon: ChartBarIcon,
      },
      {
        label: "Risk Intelligence",
        description: "Exposure, liquidity and regime monitoring",
        href: "/#quant-research",
        icon: ShieldCheckIcon,
      },
      {
        label: "Execution Infrastructure",
        description: "Systematic, controlled trading systems",
        href: "/platform",
        icon: BoltIcon,
      },
    ],
  },
  {
    label: "Markets",
    href: "/#markets",
  },
  {
    label: "Technology",
    href: "/#technology",
  },
  {
    label: "About",
    href: "/about",
    submenu: [
      {
        label: "Our Story",
        description: "Mission, team and long-term vision",
        href: "/about",
        icon: BuildingOfficeIcon,
      },
      {
        label: "Careers",
        description: "Join the research and engineering team",
        href: "/careers",
        icon: BuildingOfficeIcon,
      },
    ],
  },
  {
    label: "Insights",
    href: "/investor-tour",
    submenu: [
      {
        label: "Platform Tour",
        description: "Explore how Evermount technology works",
        href: "/investor-tour",
        icon: BookOpenIcon,
      },
      {
        label: "African Markets",
        description: "The intelligence layer for African markets",
        href: "/#markets",
        icon: GlobeAltIcon,
      },
    ],
  },
  {
    label: "Capital",
    href: "/capital",
  },
];
