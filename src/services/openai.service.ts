import { openai } from '../config/openai.config';
import {
	OpenAIChatCompletionParams,
	OpenAIEmbeddingParams,
} from '../types/openai.types';

export const generateChatCompletion = async (
	params: OpenAIChatCompletionParams
) => {
	const response = await openai.chat.completions.create({
		model: params.model || 'gpt-3.5-turbo',
		messages: params.messages,
	});

	return response.choices[0].message.content;
};

export const generateEmbeddings = async (params: OpenAIEmbeddingParams) => {
	const response = await openai.embeddings.create({
		model: params.model || 'text-embedding-ada-002',
		input: params.input,
	});

	return response.data[0].embedding;
};
