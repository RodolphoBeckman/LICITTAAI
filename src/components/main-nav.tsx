"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  BookText,
  FileText,
  History,
  Home,
  Library,
  Bot,
  Settings,
  LogOut,
} from "lucide-react";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar";
import { useAppSettings } from "@/hooks/use-app-settings";
import { Skeleton } from "@/components/ui/skeleton";

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

const bottomMenuItems = [
  { href: "/settings", label: "Configurações", icon: Settings },
];

export function MainNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { appName, logoSrc, sidebarImageSrc, isLoading } = useAppSettings();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="h-auto p-2 flex items-center gap-2">
          <div className="h-8 w-8 flex items-center justify-center rounded-lg shrink-0">
            {isLoading ? (
              <Skeleton className="h-full w-full rounded-lg" />
            ) : logoSrc ? (
              <Image
                src={logoSrc}
                alt="Logo"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
            ) : (
              <div className="h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground rounded-lg shrink-0">
                <Bot className="h-5 w-5" />
              </div>
            )}
          </div>
          {isLoading ? (
            <Skeleton className="h-6 w-24" />
          ) : (
            <span className="font-headline font-semibold text-lg group-data-[collapsible=icon]:hidden">
              {appName}
            </span>
          )}
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
      <div className="mt-auto">
        {sidebarImageSrc && (
          <div className="p-4 group-data-[collapsible=icon]:hidden">
            <Image
              src={sidebarImageSrc}
              alt="Imagem da barra lateral"
              width={200}
              height={200}
              className="w-full h-auto max-h-40 rounded-md object-contain"
            />
          </div>
        )}
        <SidebarFooter className="border-t border-sidebar-border">
          <SidebarMenu>
            {bottomMenuItems.map((item) => (
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
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                tooltip={{
                  children: "Sair",
                }}
              >
                <LogOut />
                <span>Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </div>
    </>
  );
}
