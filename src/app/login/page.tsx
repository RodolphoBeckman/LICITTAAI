"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Bot } from "lucide-react";
import { useAppSettings } from "@/hooks/use-app-settings";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  username: z.string().min(1, "O nome de usuário é obrigatório."),
  password: z.string().min(1, "A senha é obrigatória."),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { appName, logoSrc } = useAppSettings();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.username === "Valdir" && values.password === "Paula1") {
      localStorage.setItem("isLoggedIn", "true");
      toast({
        title: "Login bem-sucedido!",
        description: "Bem-vindo de volta, Valdir!",
      });
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Credenciais inválidas",
        description: "Por favor, verifique seu usuário e senha.",
      });
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <Avatar className="mx-auto h-16 w-16 mb-4">
            {logoSrc ? (
              <AvatarImage src={logoSrc} alt="App Logo" className="object-contain" />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-8 w-8" />
              </div>
            )}
          </Avatar>
          <CardTitle className="text-2xl font-headline">Bem-vindo ao {appName}</CardTitle>
          <CardDescription>Faça login para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuário</FormLabel>
                    <FormControl>
                      <Input placeholder="Valdir" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                Entrar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
