"use client";

import Link from "next/link";
import Image from "next/image";
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

// Para usar seu próprio logo, cole sua string base64 aqui.
// Por exemplo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."
const logoSrc = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMCAzMCBDIDMwIDEwLCA0MCAxMCwgNjAgMzAgUyA4MCA1MCwgOTAgMzAiIHN0cm9rZT0iaHNsKDE5NyA3MSUgNTIlKSIgc3Ryb2tlLXdpZHRoPSI4IiBmaWxsPSJ0cmFuc3BhcmVudCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTEwIDYwIEMgMzAgNDAsIDQwIDQwLCA2MCA2MCBTIDgwIDgwLCA5MCA2MCIgc3Ryb2tlPSJoc2woMTk3IDcxJSA1MiUpIiBzdHJvaxUtd2lkdGg9IjgiIGZpbGw9InRyYW5zcGFyZW50IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=";

export function MainNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border">
          <div className="h-auto p-2 flex items-center gap-2">
            <Image 
              src={logoSrc}
              alt="LICITA-IA Logo" 
              width={32} 
              height={32} 
              className="rounded-lg"
            />
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
