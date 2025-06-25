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
  question: z.string().describe('The legal question to be answered.'),
});
export type AskAiLegalQuestionsInput = z.infer<typeof AskAiLegalQuestionsInputSchema>;

const AskAiLegalQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the legal question, based on Law 14.133/2021.'),
});
export type AskAiLegalQuestionsOutput = z.infer<typeof AskAiLegalQuestionsOutputSchema>;

export async function askAiLegalQuestions(input: AskAiLegalQuestionsInput): Promise<AskAiLegalQuestionsOutput> {
  return askAiLegalQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askAiLegalQuestionsPrompt',
  input: {schema: AskAiLegalQuestionsInputSchema},
  output: {schema: AskAiLegalQuestionsOutputSchema},
  prompt: `You are a legal assistant specializing in Law 14.133/2021, the New Law of Bidding and Administrative Contracts.
  Answer the following legal question based on your knowledge of Law 14.133/2021. Provide a clear and concise answer, citing relevant articles of the law where applicable.

  Question: {{{question}}}`,
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
