"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
} from "react";
import { useLocale } from "@/context/LocaleContext";

const TRANSLATABLE_PROPS = new Set([
  "placeholder",
  "aria-label",
  "alt",
  "title",
  "label",
]);

function translateNode(node: ReactNode, tx: (value: string) => string): ReactNode {
  if (node == null || typeof node === "boolean") return node;
  if (typeof node === "string") return tx(node);
  if (typeof node === "number") return node;
  if (Array.isArray(node)) {
    return Children.map(node, (child) => translateNode(child, tx));
  }
  if (!isValidElement(node)) return node;

  const type = node.type;
  if (type === "script" || type === "style" || type === "code") {
    return node;
  }

  const props = node.props as Record<string, unknown>;
  const nextProps: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    if (key === "children") continue;
    if (typeof value === "string" && TRANSLATABLE_PROPS.has(key)) {
      nextProps[key] = tx(value);
    }
  }

  return cloneElement(
    node,
    nextProps,
    translateNode(props.children as ReactNode, tx),
  );
}

export default function TranslateTree({ children }: { children: ReactNode }) {
  const { tx } = useLocale();
  return <>{translateNode(children, tx)}</>;
}
