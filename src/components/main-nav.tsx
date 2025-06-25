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

export function MainNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border">
          <div className="h-auto p-2 flex items-center gap-2">
            <div className="h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground rounded-lg shrink-0">
                <Bot className="h-5 w-5" />
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
