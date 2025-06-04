import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { RegisterUserParams } from '../types/user.types';
import * as jwtService from '../services/jwt.service';
import {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
	handleError,
} from '../utils/errors.utils';

export const createUser = async (req: Request, res: Response) => {
	try {
		const userData: RegisterUserParams = req.body;
		const user = await userService.createUser(userData);
		res.status(201).json({ user });
	} catch (error) {
		handleError(error, res);
	}
};

export const getUserById = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;

		if (!userId) {
			throw new BadRequestError('User ID is required');
		}

		const user = await userService.findUserById(userId);
		if (!user) {
			throw new NotFoundError('User not found');
		}
		res.status(200).json(user);
	} catch (error) {
		handleError(error, res);
	}
};

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await userService.loginUser(email, password);
		if (!user) {
			throw new UnauthorizedError('Invalid credentials');
		}

		const token = jwtService.generateToken({ id: user._id });
		res.json({ id: user._id, token });
	} catch (error) {
		handleError(error, res);
	}
};

export const forgotPassword = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;

		const user = await userService.findUserByEmail(email);

		if (user) {
			// generate a token valid for 15 mins.
			const tokenDetails = await userService.generateTokenForForgotPassword();

			// save the token.
			const passwordResetToken = await userService.savePasswordResetToken({
				email,
				token: tokenDetails.token,
				expiry: tokenDetails.expiry,
			});

			// send the token to the email.
			await userService.sendPasswordResetEmail(
				passwordResetToken.toObject()._id.toString()
			);
		}

		res.status(200).json({
			message: 'If the email exists, a password reset link has been sent.',
		});
	} catch (error) {
		handleError(error, res);
	}
};
