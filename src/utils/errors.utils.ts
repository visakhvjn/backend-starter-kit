export class AppError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

// Specific error types
export class BadRequestError extends AppError {
	constructor(message = 'Bad Request') {
		super(message, 400);
	}
}

export class UnauthorizedError extends AppError {
	constructor(message = 'Unauthorized') {
		super(message, 401);
	}
}

export class ForbiddenError extends AppError {
	constructor(message = 'Forbidden') {
		super(message, 403);
	}
}

export class NotFoundError extends AppError {
	constructor(message = 'Not Found') {
		super(message, 404);
	}
}

export class ConflictError extends AppError {
	constructor(message = 'Conflict') {
		super(message, 409);
	}
}

export class InternalServerError extends AppError {
	constructor(message = 'Internal Server Error') {
		super(message, 500);
	}
}

export const handleError = (error: unknown, res: any) => {
	if (error instanceof AppError) {
		res.status(error.statusCode).json({ error: error.message });
	} else {
		console.error('Unhandled error:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
