"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookText,
  FileText,
  History,
  Home,
  Library,
  Bot,
} from "lucide-react";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  {
    href: "/generate-term",
    label: "Gerador de Termos",
    icon: FileText,
  },
  {
    href: "/explain-articles",
    label: "Explicador de Artigos",
    icon: BookText,
  },
  { href: "/ask-ai", label: "Consultor IA", icon: Bot },
  { href: "/templates", label: "Banco de Modelos", icon: Library },
  { href: "/history", label: "Histórico", icon: History },
];

const LicitaIaLogoWaves = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M 5 17 A 8 8 0 0 1 19 17" />
    <path d="M 7 14 A 6 6 0 0 1 17 14" />
    <path d="M 9 11 A 4 4 0 0 1 15 11" />
  </svg>
);

export function MainNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenuButton asChild tooltip="Dashboard" className="h-auto p-2">
          <Link href="/dashboard">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary">
                <LicitaIaLogoWaves className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-headline font-semibold text-lg group-data-[collapsible=icon]:hidden">
                LICITA-IA
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{
                  children: item.label,
                }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
