import mongoose, { Schema, Document } from 'mongoose';

export interface IPasswordReset extends Document {
	email: string;
	token: string;
	expiresAt: Date;
}

const PasswordResetSchema: Schema = new Schema({
	email: { type: String, required: true, unique: true },
	token: { type: String, required: true },
	expiresAt: { type: Date },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPasswordReset>(
	'PasswordReset',
	PasswordResetSchema,
	'password-resets'
);
