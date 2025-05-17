import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
	email: string;
	password: string;
	name: string;
	isEmailVerified?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

const UserSchema: Schema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	isEmailVerified: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', UserSchema);
