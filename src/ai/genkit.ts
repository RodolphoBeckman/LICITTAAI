import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  // This will crash the server start if the key is not set, making the error obvious in Vercel logs.
  throw new Error(
    'FATAL: A variável de ambiente GOOGLE_API_KEY não foi encontrada. Verifique as configurações do seu projeto na Vercel e faça o redeploy.'
  );
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: apiKey,
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
