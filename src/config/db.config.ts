import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDb = async () => {
	try {
		const mongoUri = process.env.MONGO_URI;

		if (!mongoUri) {
			throw new Error('MONGO_URI is not defined in the environment variables');
		}

		await mongoose.connect(mongoUri);
		console.log('MongoDB connected');
	} catch (error) {
		console.error('MongoDB connection error:', error);
	}
};

export default connectDb;
