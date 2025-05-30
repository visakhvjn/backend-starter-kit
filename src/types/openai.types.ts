import OpenAI from 'openai';

export type OpenAIChatCompletionParams = {
	model: string;
	messages: OpenAI.Chat.ChatCompletionMessageParam[];
};

export type OpenAIEmbeddingParams = {
	model: string;
	input: string;
};
