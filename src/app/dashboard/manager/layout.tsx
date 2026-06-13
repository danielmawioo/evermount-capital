"use client";

import RoleGate from "@/components/RoleGate";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGate allowed={["ADMIN", "MANAGER"]}>{children}</RoleGate>;
}
