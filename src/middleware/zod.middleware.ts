import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate =
	(schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse(req.body);

		if (!result.success) {
			res.status(400).json({ errors: result.error.errors });
		} else {
			req.body = result.data;
			next();
		}
	};
