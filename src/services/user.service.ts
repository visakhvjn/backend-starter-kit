import UserModel, { IUser } from '../models/user.model';
import bcrypt from 'bcrypt';
import * as Errors from '../utils/errors.utils';
import { CreateUserInput } from '../types/user.types';

export const findUserById = async (id: string): Promise<IUser | null> => {
	return UserModel.findById(id);
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
	return UserModel.findOne({ email });
};

export const createUser = async (userData: CreateUserInput): Promise<IUser> => {
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
