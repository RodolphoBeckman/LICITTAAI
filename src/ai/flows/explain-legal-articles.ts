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
    .describe('The legal article to be explained, including the law number.'),
});
export type ExplainLegalArticlesInput = z.infer<typeof ExplainLegalArticlesInputSchema>;

const ExplainLegalArticlesOutputSchema = z.object({
  explanation: z
    .string()
    .describe('Explanation of the legal article in plain language.'),
  summary: z.string().describe('A brief summary of the legal article.'),
  keyPoints: z.array(z.string()).describe('Key points of the legal article.'),
});
export type ExplainLegalArticlesOutput = z.infer<typeof ExplainLegalArticlesOutputSchema>;

export async function explainLegalArticles(input: ExplainLegalArticlesInput): Promise<ExplainLegalArticlesOutput> {
  return explainLegalArticlesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainLegalArticlesPrompt',
  input: {schema: ExplainLegalArticlesInputSchema},
  output: {schema: ExplainLegalArticlesOutputSchema},
  prompt: `You are an expert in administrative law, specializing in Law 14.133/2021, the New Brazilian Law on Bids and Contracts.

You will receive a legal article as input. Your task is to provide a clear and concise explanation of the article in plain language, suitable for government workers who may not have extensive legal expertise. Additionally, provide a brief summary of the article and list the key points.

Article: {{{legalArticle}}}

Ensure that the explanation is easy to understand and highlights the practical implications of the article for public bids.

Output should be structured as follows:
Explanation: [Explanation of the legal article]
Summary: [Brief summary of the legal article]
Key Points: [List of key points, each on a new line]`,
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
