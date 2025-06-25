import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileType } from "lucide-react";

const templates = [
  {
    title: "Termo de Referência - Serviços Contínuos",
    description: "Modelo padrão para contratação de serviços de natureza contínua, como limpeza e vigilância.",
    category: "Termos",
  },
  {
    title: "Portaria de Reconhecimento de Inexigibilidade",
    description: "Portaria para formalizar o reconhecimento de inexigibilidade de licitação com base no art. 74.",
    category: "Portarias",
  },
  {
    title: "Contrato Administrativo - Obras e Serviços de Engenharia",
    description: "Minuta de contrato completa para obras, com cláusulas específicas para medição e fiscalização.",
    category: "Contratos",
  },
  {
    title: "Termo de Adjudicação e Homologação",
    description: "Documento unificado para adjudicar o objeto e homologar o resultado da licitação.",
    category: "Termos",
  },
  {
    title: "Minuta de Aditivo Contratual - Prazo e Valor",
    description: "Modelo para aditar contratos, alterando prazos de execução ou valores, devidamente justificado.",
    category: "Minutas Aditivas",
  },
   {
    title: "Parecer Jurídico - Dispensa de Licitação",
    description: "Modelo de parecer para fundamentar a dispensa de licitação conforme o art. 75 da NLLC.",
    category: "Pareceres",
  },
];

export default function TemplatesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Banco de Modelos Oficiais</h1>
        <p className="text-muted-foreground">
          Acesse modelos aprovados e atualizados conforme a Nova Lei de Licitações.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <FileText className="w-8 h-8 text-primary mb-4" />
                <span className="text-xs font-semibold bg-secondary text-secondary-foreground rounded-full px-2 py-0.5">{template.category}</span>
              </div>
              <CardTitle className="font-headline text-lg">{template.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </CardContent>
            <div className="p-4 pt-0 flex justify-end gap-2">
                <Button variant="outline" size="sm" disabled>
                    <Download className="mr-2 h-4 w-4" /> PDF
                </Button>
                <Button variant="outline" size="sm" disabled>
                    <Download className="mr-2 h-4 w-4" /> DOCX
                </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
