import type { ComponentType } from "react";
import {
  ChartBarIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  BookOpenIcon,
  CpuChipIcon,
  PresentationChartLineIcon,
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
    label: "Strategies",
    href: "/features",
    submenu: [
      {
        label: "Quantitative Trading",
        description: "AI-powered algorithmic strategies",
        href: "/features",
        icon: CpuChipIcon,
      },
      {
        label: "Risk Management",
        description: "Real-time portfolio risk analytics",
        href: "/portfolio-insights",
        icon: ShieldCheckIcon,
      },
      {
        label: "Portfolio Analytics",
        description: "Advanced performance insights",
        href: "/portfolio-insights",
        icon: PresentationChartLineIcon,
      },
    ],
  },
  {
    label: "Performance",
    href: "/portfolio-insights",
  },
  {
    label: "Institutional",
    href: "/pricing",
  },
  {
    label: "Investors",
    href: "/about",
    submenu: [
      {
        label: "Our Story",
        description: "Learn about our mission and team",
        href: "/about",
        icon: BuildingOfficeIcon,
      },
      {
        label: "Careers",
        description: "Join our quantitative team",
        href: "/careers",
        icon: BuildingOfficeIcon,
      },
    ],
  },
  {
    label: "Resources",
    href: "/investor-tour",
    submenu: [
      {
        label: "Investor Tour",
        description: "Explore our platform",
        href: "/investor-tour",
        icon: BookOpenIcon,
      },
      {
        label: "Platform",
        description: "Technology and infrastructure",
        href: "/platform",
        icon: ChartBarIcon,
      },
    ],
  },
];
