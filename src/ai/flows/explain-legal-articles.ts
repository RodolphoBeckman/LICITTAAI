// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Explains legal articles related to public bids.
 *
 * - explainLegalArticles - A function that explains legal articles related to public bids.
 * - ExplainLegalArticlesInput - The input type for the explainLegalArticles function.
 * - ExplainLegalArticlesOutput - The return type for the explainLegalArticles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainLegalArticlesInputSchema = z.object({
  legalArticle: z
    .string()
    .describe('O artigo de lei a ser explicado, incluindo o número da lei.'),
});
export type ExplainLegalArticlesInput = z.infer<typeof ExplainLegalArticlesInputSchema>;

const ExplainLegalArticlesOutputSchema = z.object({
  explanation: z
    .string()
    .describe('Explicação do artigo legal em linguagem simples.'),
  summary: z.string().describe('Um breve resumo do artigo legal.'),
  keyPoints: z.array(z.string()).describe('Pontos-chave do artigo legal.'),
});
export type ExplainLegalArticlesOutput = z.infer<typeof ExplainLegalArticlesOutputSchema>;

export async function explainLegalArticles(input: ExplainLegalArticlesInput): Promise<ExplainLegalArticlesOutput> {
  return explainLegalArticlesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainLegalArticlesPrompt',
  input: {schema: ExplainLegalArticlesInputSchema},
  output: {schema: ExplainLegalArticlesOutputSchema},
  prompt: `Você é um especialista em direito administrativo, especializado na Lei 14.133/2021, a Nova Lei brasileira de Licitações e Contratos.

Você receberá um artigo de lei como entrada. Sua tarefa é fornecer uma explicação clara e concisa do artigo em linguagem simples, adequada para funcionários do governo que podem não ter amplo conhecimento jurídico. Além disso, forneça um breve resumo do artigo e liste os pontos-chave. **Responda sempre em português.**

Artigo: {{{legalArticle}}}

Garanta que a explicação seja fácil de entender e destaque as implicações práticas do artigo para as licitações públicas.`,
});

const explainLegalArticlesFlow = ai.defineFlow(
  {
    name: 'explainLegalArticlesFlow',
    inputSchema: ExplainLegalArticlesInputSchema,
    outputSchema: ExplainLegalArticlesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
