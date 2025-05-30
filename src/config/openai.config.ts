import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import { ServiceUnavailableError } from '../utils/errors.utils';

dotenv.config();

export let openai: OpenAI;

export const connectOpenAI = async () => {
	if (process.env.OPENAI_API_KEY) {
		try {
			openai = new OpenAI({
				apiKey: process.env.OPENAI_API_KEY,
			});

			await openai.models.list();
			console.log('OpenAI client connected successfully');
		} catch (error) {
			throw new ServiceUnavailableError(
				`Failed to connect to OpenAI ${(error as any).error.message}`
			);
		}
	}
};
