import { z } from 'zod';

export const sendEmailSchema = z.object({
	to: z.string().email(),
	subject: z.string(),
	html: z.string(),
});

export type SendEmailParams = z.infer<typeof sendEmailSchema>;
