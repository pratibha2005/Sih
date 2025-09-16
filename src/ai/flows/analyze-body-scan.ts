'use server';

/**
 * @fileOverview AI-powered body scan analysis for activity readiness.
 *
 * - analyzeBodyScan - Analyzes body scan data to assess user readiness for an activity.
 * - AnalyzeBodyScanInput - The input type for the analyzeBodyScan function.
 * - AnalyzeBodyScanOutput - The return type for the analyzeBodyScan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeBodyScanInputSchema = z.object({
  activityType: z
    .string()
    .describe('The type of activity the user is planning to perform.'),
  bodyScanDataUri: z
    .string()
    .describe(
      "A photo of the user's body scan, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userHeightCm: z.number().describe('The height of the user in centimeters.'),
  userWeightKg: z.number().describe('The weight of the user in kilograms.'),
  userAge: z.number().describe('The age of the user in years.'),
  userGender: z.string().describe('The gender of the user.'),
});
export type AnalyzeBodyScanInput = z.infer<typeof AnalyzeBodyScanInputSchema>;

const AnalyzeBodyScanOutputSchema = z.object({
  readinessAssessment: z
    .string()
    .describe(
      'An assessment of the user readiness for the selected activity, including any potential risks or warnings.'
    ),
  recommendations: z
    .string()
    .describe(
      'Personalized recommendations to optimize performance and avoid injuries.'
    ),
});
export type AnalyzeBodyScanOutput = z.infer<typeof AnalyzeBodyScanOutputSchema>;

export async function analyzeBodyScan(input: AnalyzeBodyScanInput): Promise<AnalyzeBodyScanOutput> {
  return analyzeBodyScanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeBodyScanPrompt',
  input: {schema: AnalyzeBodyScanInputSchema},
  output: {schema: AnalyzeBodyScanOutputSchema},
  prompt: `You are an AI assistant specialized in analyzing body scan data to assess a user's readiness for a specific physical activity.

  Given the following information, provide a readiness assessment and personalized recommendations:

  Activity Type: {{{activityType}}}
  Body Scan Image: {{media url=bodyScanDataUri}}
  User Height (cm): {{{userHeightCm}}}
  User Weight (kg): {{{userWeightKg}}}
  User Age: {{{userAge}}}
  User Gender: {{{userGender}}}

  Consider factors such as posture, alignment, and any potential risk factors visible in the body scan.

  Provide a detailed readiness assessment, highlighting any concerns or limitations.
  Offer personalized recommendations to optimize performance and avoid potential injuries during the selected activity.

  Readiness Assessment:
  Recommendations: `,
});

const analyzeBodyScanFlow = ai.defineFlow(
  {
    name: 'analyzeBodyScanFlow',
    inputSchema: AnalyzeBodyScanInputSchema,
    outputSchema: AnalyzeBodyScanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
