"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookText,
  FileText,
  Gavel,
  History,
  Home,
  Library,
  MessageSquare,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
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

export function MainNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 p-2">
          <div className="p-1.5 rounded-lg bg-primary">
            <Gavel className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-headline font-semibold text-lg group-data-[collapsible=icon]:hidden">
            LICITA-IA
          </span>
        </div>
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
