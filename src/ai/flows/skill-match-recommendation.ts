// SkillMatchRecommendation.ts
'use server';

/**
 * @fileOverview AI agent that recommends skill matches between students.
 *
 * - recommendSkillMatches - A function that recommends skill matches between students.
 * - SkillMatchInput - The input type for the recommendSkillMatches function.
 * - SkillMatchOutput - The return type for the recommendSkillMatches function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillMatchInputSchema = z.object({
  teachingSkills: z
    .array(z.string())
    .describe('List of skills the student can teach.'),
  learningSkills: z
    .array(z.string())
    .describe('List of skills the student wants to learn.'),
  studentProfile: z.string().optional().describe('The student profile information.'),
});

export type SkillMatchInput = z.infer<typeof SkillMatchInputSchema>;

const SkillMatchOutputSchema = z.object({
  recommendedMatches: z
    .array(z.string())
    .describe('List of recommended student profiles for skill matching.'),
  reasoning: z.string().describe('Reasoning for the recommendations.'),
});

export type SkillMatchOutput = z.infer<typeof SkillMatchOutputSchema>;

export async function recommendSkillMatches(
  input: SkillMatchInput
): Promise<SkillMatchOutput> {
  return skillMatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skillMatchPrompt',
  input: {schema: SkillMatchInputSchema},
  output: {schema: SkillMatchOutputSchema},
  prompt: `You are an AI assistant designed to recommend skill matches between students.

  Given a student's profile and their desired learning skills and teaching skills, recommend other students with complementary skills.
  Prioritize matches where the teaching skills of one student align with the learning skills of another, and vice versa.

  Consider the following information:
  - Student Profile: {{{studentProfile}}}
  - Teaching Skills: {{#each teachingSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  - Learning Skills: {{#each learningSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Based on this information, provide a list of recommended student profiles and a brief explanation of why each match is suitable.
  Format the output as a JSON object with 'recommendedMatches' (an array of student profiles) and 'reasoning' (a string explaining the recommendations) fields.
  `,
});

const skillMatchFlow = ai.defineFlow(
  {
    name: 'skillMatchFlow',
    inputSchema: SkillMatchInputSchema,
    outputSchema: SkillMatchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
