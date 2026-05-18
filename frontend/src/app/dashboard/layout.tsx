import React from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Sage OS",
  description: "Manage your premium study spaces with spatial intelligence.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
