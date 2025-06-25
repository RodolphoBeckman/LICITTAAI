import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookText,
  FileText,
  Library,
  History,
  Bot,
  ArrowRight,
} from 'lucide-react';

const features = [
  {
    title: 'Gerador de Termos',
    description: 'Crie Termos de Referência completos e personalizados.',
    icon: FileText,
    href: '/generate-term',
    color: 'text-blue-500',
  },
  {
    title: 'Explicador de Artigos',
    description: 'Entenda os artigos da Lei nº 14.133/2021 de forma clara.',
    icon: BookText,
    href: '/explain-articles',
    color: 'text-green-500',
  },
  {
    title: 'Consultor IA',
    description: 'Tire suas dúvidas sobre licitações com nosso assistente.',
    icon: Bot,
    href: '/ask-ai',
    color: 'text-purple-500',
  },
  {
    title: 'Banco de Modelos',
    description: 'Acesse modelos oficiais de termos, portarias e contratos.',
    icon: Library,
    href: '/templates',
    color: 'text-orange-500',
  },
  {
    title: 'Histórico de Contratações',
    description: 'Consulte o histórico detalhado de cada processo.',
    icon: History,
    href: '/history',
    color: 'text-red-500',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Bem-vindo ao LICITA-IA</h1>
        <p className="text-muted-foreground">
          Seu assistente inteligente para licitações e contratos.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Link href={feature.href} key={feature.href}>
            <Card className="h-full hover:border-primary transition-all duration-300 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold font-headline">
                  {feature.title}
                </CardTitle>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
                <div className="flex items-center gap-2 mt-4 text-primary font-semibold text-sm">
                  <span>Acessar</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
