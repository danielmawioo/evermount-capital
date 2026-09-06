import { useMemo } from "react";
import { useLocale } from "@/context/LocaleContext";
import { navItems, type NavItem } from "./navItems";

export function useTranslatedNav(): NavItem[] {
  const { t } = useLocale();

  return useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        label: t(`nav.${item.id}`),
        submenu: item.submenu?.map((sub) => ({
          ...sub,
          label: t(`nav.${sub.id}`),
          description: t(`nav.${sub.id}Desc`),
        })),
      })),
    [t],
  );
}
