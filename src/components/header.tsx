"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";

const pageTitles: { [key: string]: string } = {
  "/dashboard": "Dashboard",
  "/generate-term": "Gerador de Termo de Referência",
  "/explain-articles": "Explicador de Artigos",
  "/ask-ai": "Consultor IA",
  "/templates": "Banco de Modelos",
  "/history": "Histórico de Contratações",
};

export function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "LICITA-IA";

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">LICITA-IA</span>
        <span className="text-sm text-muted-foreground">/</span>
        <h1 className="font-headline text-md font-semibold">{title}</h1>
      </div>
    </header>
  );
}
