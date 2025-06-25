"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { explainLegalArticles, ExplainLegalArticlesOutput } from "@/ai/flows/explain-legal-articles";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const formSchema = z.object({
  legalArticle: z.string().min(5, "Por favor, insira um artigo válido (ex: Art. 74 da Lei 14.133/2021)."),
});

export default function ExplainArticlesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState<ExplainLegalArticlesOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { legalArticle: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setExplanation(null);
    try {
      const result = await explainLegalArticles(values);
      setExplanation(result);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao buscar explicação",
        description: "Ocorreu um erro ao se comunicar com a IA. Tente novamente.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Explicador de Artigos</CardTitle>
          <CardDescription>
            Insira o artigo da Lei nº 14.133/2021 que você deseja entender melhor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4">
              <FormField
                control={form.control}
                name="legalArticle"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="sr-only">Artigo Legal</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Art. 75 da Lei 14.133/2021" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full sm:w-40">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Explicando...
                  </>
                ) : (
                  "Explicar Artigo"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
         <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
            </CardContent>
         </Card>
      )}

      {explanation && (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Explicação Detalhada</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                        {explanation.explanation}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Resumo</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground italic">
                        "{explanation.summary}"
                    </p>
                </CardContent>
            </Card>
            <Card>
                 <CardHeader>
                    <CardTitle className="font-headline">Pontos-Chave</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Ver os pontos-chave do artigo</AccordionTrigger>
                            <AccordionContent>
                                <ul className="space-y-3 pl-5 mt-2">
                                    {explanation.keyPoints.map((point, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                            <span className="text-muted-foreground">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}
