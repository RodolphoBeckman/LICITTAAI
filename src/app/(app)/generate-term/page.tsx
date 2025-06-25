"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateTermOfReference } from "@/ai/flows/generate-term-of-reference";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Copy, FileDown, Share2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  objectDescription: z.string().min(10, "Descreva o objeto com mais detalhes."),
  objectType: z.string().min(3, "Especifique o tipo de objeto."),
  municipalityName: z.string().min(3, "Insira o nome do município."),
  justificationForProcurement: z.string().min(20, "A justificativa precisa ser mais detalhada."),
  estimatedValue: z.string().min(1, "Insira o valor estimado."),
  responsibleSecretariat: z.string().min(5, "Insira a secretaria responsável."),
  contractDuration: z.string().min(1, "Insira a duração do contrato em meses."),
});

export default function GenerateTermPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTerm, setGeneratedTerm] = useState("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      objectDescription: "",
      objectType: "",
      municipalityName: "",
      justificationForProcurement: "",
      estimatedValue: "",
      responsibleSecretariat: "",
      contractDuration: "12",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedTerm("");
    try {
      const result = await generateTermOfReference(values);
      setGeneratedTerm(result.termOfReference);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao gerar termo",
        description: "Ocorreu um erro ao se comunicar com a IA. Tente novamente.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTerm);
    toast({
      title: "Copiado!",
      description: "O termo de referência foi copiado para a área de transferência.",
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Gerar Termo de Referência</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para gerar um Termo de Referência
            automático com base na Lei nº 14.133/2021.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="objectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objeto da Contratação</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ex: Contratação de empresa para fornecimento de merenda escolar" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="justificationForProcurement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Justificativa da Contratação</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ex: Necessidade de garantir a alimentação dos alunos da rede municipal..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <FormField control={form.control} name="objectType" render={({ field }) => (<FormItem><FormLabel>Tipo de Objeto</FormLabel><FormControl><Input placeholder="Ex: Educação" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="municipalityName" render={({ field }) => (<FormItem><FormLabel>Nome do Município</FormLabel><FormControl><Input placeholder="Ex: Cidade Feliz" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="estimatedValue" render={({ field }) => (<FormItem><FormLabel>Valor Estimado (R$)</FormLabel><FormControl><Input placeholder="Ex: 1.200.000,00" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="responsibleSecretariat" render={({ field }) => (<FormItem><FormLabel>Secretaria Responsável</FormLabel><FormControl><Input placeholder="Ex: Secretaria de Educação" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="contractDuration" render={({ field }) => (<FormItem><FormLabel>Duração (meses)</FormLabel><FormControl><Input type="number" placeholder="12" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (<> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando... </>) : "Gerar Termo"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Termo Gerado</CardTitle>
          <CardDescription>
            Abaixo está o documento gerado pela IA. Revise antes de utilizar.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[500px] flex flex-col">
          {isLoading ? (
            <div className="space-y-4 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
              <br />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <Textarea
              readOnly
              value={generatedTerm}
              className="flex-1 font-code text-sm"
              placeholder="O documento gerado aparecerá aqui..."
            />
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!generatedTerm || isLoading}>
            <Copy className="mr-2 h-4 w-4" /> Copiar
          </Button>
          <Button variant="outline" size="sm" disabled>
            <FileDown className="mr-2 h-4 w-4" /> Exportar
          </Button>
          <Button size="sm" disabled>
            <Share2 className="mr-2 h-4 w-4" /> Compartilhar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
