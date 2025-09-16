'use server';
/**
 * @fileOverview This file defines a Genkit flow for counting sit-ups and push-ups using AI.
 *
 * The flow takes video data as input, analyzes the user's form, counts repetitions,
 * and provides feedback on the exercise technique.
 *
 * @fileOverview
 * - `countSitupsPushups`: Function to initiate the counting process.
 * - `CountSitupsPushupsInput`: Input type for the `countSitupsPushups` function.
 * - `CountSitupsPushupsOutput`: Output type for the `countSitupsPushups` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CountSitupsPushupsInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video of the user performing sit-ups or push-ups, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  exerciseType: z.enum(['sit-up', 'push-up']).describe('The type of exercise being performed.'),
});
export type CountSitupsPushupsInput = z.infer<typeof CountSitupsPushupsInputSchema>;

const CountSitupsPushupsOutputSchema = z.object({
  repetitionCount: z.number().describe('The number of repetitions performed.'),
  formCorrectness: z.number().describe('A score indicating the correctness of the user\'s form (0-100).'),
  feedback: z.string().describe('Feedback on the user\'s form and technique.'),
  caloriesBurned: z.number().describe('Estimated calories burned during the exercise.'),
});
export type CountSitupsPushupsOutput = z.infer<typeof CountSitupsPushupsOutputSchema>;

export async function countSitupsPushups(input: CountSitupsPushupsInput): Promise<CountSitupsPushupsOutput> {
  return countSitupsPushupsFlow(input);
}

const countSitupsPushupsPrompt = ai.definePrompt({
  name: 'countSitupsPushupsPrompt',
  input: {schema: CountSitupsPushupsInputSchema},
  output: {schema: CountSitupsPushupsOutputSchema},
  prompt: `You are an AI personal trainer specializing in analyzing exercise form and counting repetitions.

You will receive a video of a user performing either sit-ups or push-ups. Your task is to:

1.  Count the number of repetitions performed in the video.
2.  Assess the user's form and provide a formCorrectness score between 0 and 100, where 100 indicates perfect form.
3.  Provide specific and actionable feedback on the user's form, suggesting areas for improvement.
4.  Estimate the number of calories burned during the exercise.

Here is the video of the exercise:
{{media url=videoDataUri}}

Exercise Type: {{{exerciseType}}}

Provide the output in JSON format.`,
});

const countSitupsPushupsFlow = ai.defineFlow(
  {
    name: 'countSitupsPushupsFlow',
    inputSchema: CountSitupsPushupsInputSchema,
    outputSchema: CountSitupsPushupsOutputSchema,
  },
  async input => {
    const {output} = await countSitupsPushupsPrompt(input);
    return output!;
  }
);
