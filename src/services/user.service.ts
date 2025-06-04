import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dotenv from 'dotenv';

import UserModel, { IUser } from '../models/user.model';
import * as Errors from '../utils/errors.utils';
import {
	RegisterUserParams,
	SavePasswordResetParams,
	savePasswordResetSchema,
} from '../types/user.types';
import passwordResetModel, {
	IPasswordReset,
} from '../models/password-reset.model';
import * as resendService from './resend.service';

dotenv.config();

export const findUserById = async (id: string): Promise<IUser | null> => {
	return UserModel.findById(id);
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
	return UserModel.findOne({ email });
};

export const createUser = async (
	userData: RegisterUserParams
): Promise<IUser> => {
	const { email, password, name } = userData;

	// Check if user already exists
	const existingUser = await findUserByEmail(email);

	if (existingUser) {
		throw new Errors.ConflictError('User already exists');
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	return UserModel.create({
		email,
		password: hashedPassword,
		name,
	});
};

export const loginUser = async (
	email: string,
	password: string
): Promise<IUser | null> => {
	const user = await UserModel.findOne({ email });
	if (!user) {
		return null; // User not found
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return null; // Password does not match
	}

	return user; // User authenticated successfully
};

export const generateTokenForForgotPassword = async (): Promise<{
	token: string;
	expiry: number;
}> => {
	const token = crypto.randomBytes(32).toString('hex');
	const expiry = Date.now() + 1000 * 60 * 15; // 15 mins

	return { token, expiry };
};

export const savePasswordResetToken = async (
	params: SavePasswordResetParams
): Promise<IPasswordReset> => {
	savePasswordResetSchema.parse(params);

	return passwordResetModel.create({
		email: params.email,
		token: params.token,
		expiresAt: params.expiry,
	});
};

export const sendPasswordResetEmail = async (id: string) => {
	const passwordResetToken = await passwordResetModel.findOne({ _id: id });

	if (!passwordResetToken) {
		return;
	}

	const resetLink = `${process.env.APP_BASE_URL}/auth/reset-password?token=${passwordResetToken.token}`;
	const html = passwordResetTemplate(resetLink);

	await resendService.sendEmail({
		to: passwordResetToken.email,
		subject: 'Reset Your Password',
		html,
	});
};

const passwordResetTemplate = (resetLink: string) => {
	return `
		<p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 15 minutes.</p>
	`;
};
