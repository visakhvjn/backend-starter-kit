import cors, { CorsOptions } from 'cors';
import { ForbiddenError } from '../utils/errors.utils';

// 3001 is your frontend port
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

const options: CorsOptions = {
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin!)) {
			callback(null, true);
		} else {
			callback(new ForbiddenError('Not allowed by CORS'));
		}
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true,
};

export const corsMiddleware = cors(options);
