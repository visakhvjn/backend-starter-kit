import cloudinary from '../config/cloudinary.config';
import ImageModel, { IImage } from '../models/image.model';

export const uploadImage = async (filePath: string, folder: string) => {
	try {
		const result = await cloudinary.uploader.upload(filePath, {
			folder,
		});

		// Save image metadata to MongoDB
		const image: IImage = await ImageModel.create({
			publicId: result.public_id,
			url: result.secure_url,
			folder,
		});

		return image;
	} catch (error) {
		console.error('Cloudinary upload error:', error);
		throw error;
	}
};

export const deleteImage = async (publicId: string) => {
	try {
		// Delete image from Cloudinary
		const result = await cloudinary.uploader.destroy(publicId);

		// Remove image metadata from MongoDB
		await ImageModel.findOneAndDelete({ publicId });

		return result;
	} catch (error) {
		console.error('Cloudinary delete error:', error);
		throw error;
	}
};
