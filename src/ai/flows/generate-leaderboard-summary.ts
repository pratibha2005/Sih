'use server';

/**
 * @fileOverview A flow that generates a summary of the leaderboard, highlighting key insights and trends.
 *
 * - generateLeaderboardSummary - A function that generates the leaderboard summary.
 * - GenerateLeaderboardSummaryInput - The input type for the generateLeaderboardSummary function.
 * - GenerateLeaderboardSummaryOutput - The return type for the generateLeaderboardSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLeaderboardSummaryInputSchema = z.object({
  activityType: z.string().describe('The type of activity to summarize (Running, Long Jump, Sit-ups, Push-ups, High Jump).'),
  location: z.string().optional().describe('The location to filter the leaderboard by (State, Village, etc.).'),
  topPerformers: z.array(z.object({
    name: z.string().describe('The name or anonymized ID of the performer.'),
    performanceMetric: z.string().describe('The performance metric of the performer (CM or Time).'),
    score: z.number().describe('The score of the performer.'),
  })).describe('The top performers on the leaderboard.'),
});
export type GenerateLeaderboardSummaryInput = z.infer<typeof GenerateLeaderboardSummaryInputSchema>;

const GenerateLeaderboardSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the leaderboard, highlighting key insights and trends.'),
});
export type GenerateLeaderboardSummaryOutput = z.infer<typeof GenerateLeaderboardSummaryOutputSchema>;

export async function generateLeaderboardSummary(input: GenerateLeaderboardSummaryInput): Promise<GenerateLeaderboardSummaryOutput> {
  return generateLeaderboardSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLeaderboardSummaryPrompt',
  input: {schema: GenerateLeaderboardSummaryInputSchema},
  output: {schema: GenerateLeaderboardSummaryOutputSchema},
  prompt: `You are an AI assistant that analyzes leaderboard data and provides insightful summaries.

  Based on the following leaderboard data for {{activityType}}:

  {{#if location}}
  Filtered by Location: {{location}}
  {{/if}}

  Top Performers:
  {{#each topPerformers}}
  - {{name}}: {{performanceMetric}} - {{score}}
  {{/each}}

  Generate a concise summary of the leaderboard, highlighting key trends and insights. Focus on:
  - The overall performance of the top performers.
  - Any notable patterns or trends in the data.
  - Potential areas for improvement for users.

  Summary:`,
});

const generateLeaderboardSummaryFlow = ai.defineFlow(
  {
    name: 'generateLeaderboardSummaryFlow',
    inputSchema: GenerateLeaderboardSummaryInputSchema,
    outputSchema: GenerateLeaderboardSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
