import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errors.utils';

export const authenticateJWT = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new AppError('Authorization token is missing or invalid', 401);
	}

	const token = authHeader.split(' ')[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!);
		req.user = decoded;

		next();
	} catch (error) {
		throw new AppError('Invalid or expired token', 401);
	}
};
