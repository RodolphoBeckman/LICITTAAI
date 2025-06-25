// src/ai/flows/generate-term-of-reference.ts
'use server';
/**
 * @fileOverview Generates a Term of Reference (Termo de Referência) for public procurement processes, compliant with Law 14.133/2021.
 *
 * - generateTermOfReference - A function that generates the Term of Reference.
 * - GenerateTermOfReferenceInput - The input type for the generateTermOfReference function.
 * - GenerateTermOfReferenceOutput - The return type for the generateTermOfReference function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTermOfReferenceInputSchema = z.object({
  objectDescription: z
    .string()
    .describe(
      'Detailed description of the object of the procurement, specifying the service or product to be acquired.'
    ),
  objectType: z
    .string()
    .describe(
      'The type of object for the procurement (e.g., education, health, legal services).'
    ),
  municipalityName: z.string().describe('The name of the municipality.'),
  justificationForProcurement: z
    .string()
    .describe(
      'The reason for the procurement, explaining the necessity and public interest.'
    ),
  estimatedValue: z
    .string()
    .describe('The estimated value of the procurement.'),
  responsibleSecretariat: z
    .string()
    .describe('The secretariat responsible for the procurement.'),
  contractDuration: z
    .string()
    .describe('The duration of the contract in months.'),
});
export type GenerateTermOfReferenceInput = z.infer<
  typeof GenerateTermOfReferenceInputSchema
>;

const GenerateTermOfReferenceOutputSchema = z.object({
  termOfReference: z
    .string()
    .describe('The generated Term of Reference document.'),
});
export type GenerateTermOfReferenceOutput = z.infer<
  typeof GenerateTermOfReferenceOutputSchema
>;

export async function generateTermOfReference(
  input: GenerateTermOfReferenceInput
): Promise<GenerateTermOfReferenceOutput> {
  return generateTermOfReferenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTermOfReferencePrompt',
  input: {schema: GenerateTermOfReferenceInputSchema},
  output: {schema: GenerateTermOfReferenceOutputSchema},
  prompt: `Você é uma assistente jurídica especializada em Direito Administrativo, especialmente na Lei nº 14.133/2021. Sua função é assessorar tecnicamente o Departamento de Licitações do município de {{{municipalityName}}}.

Gere um Termo de Referência completo e personalizado, observando os seguintes parâmetros:

* Objeto: {{{objectDescription}}} (Tipo: {{{objectType}}})
* Justificativa da Contratação: {{{justificationForProcurement}}}
* Valor Estimado: {{{estimatedValue}}}
* Secretaria Responsável: {{{responsibleSecretariat}}}
* Duração do Contrato: {{{contractDuration}}} meses

Sempre:

* Utilize linguagem técnico-jurídica clara.
* Fundamente nos dispositivos específicos da Lei nº 14.133/2021.
* Garanta a coerência normativa e administrativa.
* Faça distinção entre Pessoa Física e Jurídica contratada.

Verifique se há:

* Objeto detalhado
* Justificativa da contratação
* Vantajosidade da contratação
* Especificação de dotação orçamentária
* Cláusulas obrigatórias: vigência, forma de pagamento, obrigações das partes, rescisão, foro

Nunca produza texto genérico. Sempre contextualize conforme o objeto do contrato.
`,
});

const generateTermOfReferenceFlow = ai.defineFlow(
  {
    name: 'generateTermOfReferenceFlow',
    inputSchema: GenerateTermOfReferenceInputSchema,
    outputSchema: GenerateTermOfReferenceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
