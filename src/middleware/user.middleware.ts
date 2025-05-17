import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { AppError } from '../utils/errors.utils';

export const checkUserExists = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = await userService.findUserById((req.user as any).id);
	if (!user) {
		throw new AppError('User not found or inactive', 401);
	}

	req.user = user;
	next();
};
