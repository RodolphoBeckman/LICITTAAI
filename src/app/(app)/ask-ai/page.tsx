"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { askAiLegalQuestions } from "@/ai/flows/ask-ai-legal-questions";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Bot, Loader2, Send, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  question: z.string().min(10, "Sua pergunta deve ter pelo menos 10 caracteres."),
});

type Message = {
  role: "user" | "ai" | "loading";
  content: string;
};

export default function AskAiPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { question: "" },
  });
  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setMessages((prev) => [...prev, { role: "user", content: values.question }]);
    setMessages((prev) => [...prev, { role: "loading", content: "" }]);
    form.reset();

    try {
      const result = await askAiLegalQuestions(values);
      setMessages((prev) => prev.filter(msg => msg.role !== 'loading'));
      setMessages((prev) => [...prev, { role: "ai", content: result.answer }]);
    } catch (error) {
      setMessages((prev) => prev.filter(msg => msg.role !== 'loading'));
      toast({
        variant: "destructive",
        title: "Erro na consulta",
        description: "Ocorreu um erro ao se comunicar com a IA. Tente novamente.",
      });
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-3xl mx-auto">
      <div className="flex-1 overflow-y-auto pr-4">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.length === 0 && (
                <div className="text-center p-8 text-muted-foreground">
                    <Bot className="mx-auto h-12 w-12 mb-4" />
                    <h2 className="text-xl font-semibold font-headline">Consultor Jurídico IA</h2>
                    <p>Faça sua pergunta sobre a Lei 14.133/2021.</p>
                </div>
            )}
            {messages.map((message, index) => (
              <div key={index} className={cn("flex items-start gap-4", message.role === "user" ? "justify-end" : "")}>
                {message.role !== "user" && (
                    <Avatar className="w-8 h-8">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                             <Bot className="h-5 w-5" />
                        </div>
                    </Avatar>
                )}
                
                <div className={cn(
                    "max-w-md rounded-lg p-3", 
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border",
                    message.role === 'loading' && 'p-4'
                )}>
                  {message.role === 'loading' ? (
                     <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  ) : (
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  )}
                </div>

                {message.role === "user" && (
                    <Avatar className="w-8 h-8">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                            <User className="h-5 w-5" />
                        </div>
                    </Avatar>
                )}

              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="mt-4 pt-4 border-t">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Qual a fundamentação para pagamento por inexigibilidade?" {...field} disabled={isLoading}/>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="icon">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                <span className="sr-only">Enviar</span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
