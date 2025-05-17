import { resend } from '../config/resend.config';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = async (to: string, subject: string, html: string) => {
	return resend.emails.send({
		from: process.env.RESEND_FROM_EMAIL!,
		to,
		subject,
		html,
	});
};
