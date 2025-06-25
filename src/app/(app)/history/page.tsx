import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const history = [
  {
    id: "PROC-2024-001",
    object: "Aquisição de computadores para a Secretaria de Educação",
    status: "Concluído",
    date: "2024-03-15",
  },
  {
    id: "PROC-2024-002",
    object: "Contratação de empresa de limpeza urbana",
    status: "Em Execução",
    date: "2024-04-01",
  },
  {
    id: "PROC-2024-003",
    object: "Serviços de consultoria jurídica tributária",
    status: "Em Execução",
    date: "2024-05-20",
  },
  {
    id: "PROC-2024-004",
    object: "Construção de nova creche municipal",
    status: "Planejamento",
    date: "2024-06-10",
  },
  {
    id: "PROC-2024-005",
    object: "Fornecimento de merenda escolar para o 2º semestre",
    status: "Parecer Jurídico",
    date: "2024-06-25",
  },
  {
    id: "PROC-2023-198",
    object: "Manutenção de ar-condicionado dos prédios públicos",
    status: "Encerrado",
    date: "2023-12-28",
  },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  "Concluído": "default",
  "Em Execução": "outline",
  "Planejamento": "secondary",
  "Parecer Jurídico": "secondary",
  "Encerrado": "destructive",
};


export default function HistoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Histórico de Contratações</h1>
        <p className="text-muted-foreground">
          Consulte todos os processos de licitação e contratação direta.
        </p>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Processo</TableHead>
              <TableHead>Objeto</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Data de Início</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.object}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={statusVariant[item.status] || "default"}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{item.date}</TableCell>
                <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem disabled>Ver Detalhes</DropdownMenuItem>
                            <DropdownMenuItem disabled>Baixar Documentos</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
