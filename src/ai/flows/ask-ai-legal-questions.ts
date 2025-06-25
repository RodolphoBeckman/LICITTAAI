// src/ai/flows/ask-ai-legal-questions.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for answering legal questions related to Law 14.133/2021.
 *
 * - askAiLegalQuestions - A function that accepts a legal question and returns an answer based on Law 14.133/2021.
 * - AskAiLegalQuestionsInput - The input type for the askAiLegalQuestions function.
 * - AskAiLegalQuestionsOutput - The return type for the askAiLegalQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskAiLegalQuestionsInputSchema = z.object({
  question: z.string().describe('A pergunta jurídica a ser respondida.'),
});
export type AskAiLegalQuestionsInput = z.infer<typeof AskAiLegalQuestionsInputSchema>;

const AskAiLegalQuestionsOutputSchema = z.object({
  answer: z.string().describe('A resposta para a pergunta jurídica, com base na Lei 14.133/2021.'),
});
export type AskAiLegalQuestionsOutput = z.infer<typeof AskAiLegalQuestionsOutputSchema>;

export async function askAiLegalQuestions(input: AskAiLegalQuestionsInput): Promise<AskAiLegalQuestionsOutput> {
  return askAiLegalQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askAiLegalQuestionsPrompt',
  input: {schema: AskAiLegalQuestionsInputSchema},
  output: {schema: AskAiLegalQuestionsOutputSchema},
  prompt: `Você é um assistente jurídico especializado na Lei 14.133/2021, a Nova Lei de Licitações e Contratos Administrativos.
  Responda à seguinte pergunta jurídica com base no seu conhecimento da Lei 14.133/2021. Forneça uma resposta clara e concisa, citando os artigos relevantes da lei quando aplicável. **Responda sempre em português.**

  Pergunta: {{{question}}}`,
});

const askAiLegalQuestionsFlow = ai.defineFlow(
  {
    name: 'askAiLegalQuestionsFlow',
    inputSchema: AskAiLegalQuestionsInputSchema,
    outputSchema: AskAiLegalQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
