"use client";

import TranslateTree from "@/app/components/TranslateTree";

export default function TranslatePage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TranslateTree>{children}</TranslateTree>;
}
