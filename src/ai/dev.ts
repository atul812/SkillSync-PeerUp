
import { config } from 'dotenv';
config(); // Ensure this is the very first thing to run to load .env variables

import '@/ai/flows/skill-match-recommendation.ts';
import '@/ai/flows/chat-bot-flow.ts'; // Added import for the new chat bot flow
