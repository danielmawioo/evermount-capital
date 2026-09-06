"use client";

import type { ElementType, ReactNode } from "react";
import { useLocale } from "@/context/LocaleContext";

export default function Tx({
  as: Tag = "span",
  children,
  className,
}: {
  as?: ElementType;
  children: string;
  className?: string;
}) {
  const { tx } = useLocale();
  return <Tag className={className}>{tx(children)}</Tag>;
}

export function TxList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const { tx } = useLocale();
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item}>{tx(item)}</li>
      ))}
    </ul>
  );
}
