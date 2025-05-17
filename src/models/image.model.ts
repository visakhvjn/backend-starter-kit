import mongoose, { Schema, Document } from 'mongoose';

export interface IImage extends Document {
	publicId: string;
	url: string;
	folder: string;
	uploadedAt: Date;
}

const ImageSchema: Schema = new Schema({
	publicId: { type: String, required: true },
	url: { type: String, required: true },
	folder: { type: String, required: true },
	uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IImage>('Image', ImageSchema);
