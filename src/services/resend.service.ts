import { resend } from '../config/resend.config';
import dotenv from 'dotenv';
import { SendEmailParams, sendEmailSchema } from '../types/resend.types';
dotenv.config();

export const sendEmail = async (params: SendEmailParams) => {
	sendEmailSchema.parse(params);

	return resend.emails.send({
		from: process.env.RESEND_FROM_EMAIL!,
		...params,
	});
};
