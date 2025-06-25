"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSettings } from "@/hooks/use-app-settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, Bot, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  appName: z.string().min(1, "O nome do aplicativo é obrigatório."),
  logo: z.any().optional(),
});

export default function SettingsPage() {
  const { appName, logoSrc, saveSettings, isLoading: isLoadingSettings } = useAppSettings();
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      appName: appName,
      logo: null,
    },
  });

  useEffect(() => {
    form.reset({ appName });
    setLogoPreview(logoSrc);
  }, [appName, logoSrc, form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'image/png') {
        toast({
          variant: "destructive",
          title: "Formato inválido",
          description: "Por favor, selecione um arquivo de imagem PNG.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLogoPreview(base64String);
        form.setValue("logo", base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
     saveSettings({
      appName: data.appName,
      logoSrc: data.logo || logoPreview, 
    });
    toast({
      title: "Configurações salvas!",
      description: "Suas alterações foram salvas com sucesso.",
    });
  };

  if (isLoadingSettings) {
    return (
      <div className="max-w-2xl mx-auto flex justify-center items-center h-full">
        <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Configurações</CardTitle>
          <CardDescription>
            Personalize o nome e o logo do seu aplicativo. As alterações são salvas localmente no seu navegador.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="appName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Aplicativo</FormLabel>
                    <FormControl>
                      <Input placeholder="LICITA-IA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormItem>
                <FormLabel>Logo do Aplicativo (PNG)</FormLabel>
                <div className="flex items-center gap-4">
                   <Avatar className="h-16 w-16">
                     {logoPreview ? (
                       <AvatarImage src={logoPreview} alt="Logo preview" className="object-contain" />
                     ) : (
                       <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Bot className="h-8 w-8" />
                       </div>
                     )}
                   </Avatar>
                   <Controller
                      control={form.control}
                      name="logo"
                      render={({ field }) => (
                        <Button asChild variant="outline">
                           <label htmlFor="logo-upload" className="cursor-pointer">
                            <Upload className="mr-2 h-4 w-4" />
                            Fazer Upload
                            <input
                              id="logo-upload"
                              type="file"
                              className="sr-only"
                              accept="image/png"
                              onChange={handleFileChange}
                            />
                           </label>
                        </Button>
                      )}
                   />
                </div>
                <FormMessage />
              </FormItem>

              <Button type="submit" disabled={form.formState.isSubmitting}>
                Salvar Alterações
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
