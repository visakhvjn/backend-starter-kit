import cloudinary from '../config/cloudinary.config';

export const uploadImage = async (filePath: string, folder: string) => {
	try {
		const result = await cloudinary.uploader.upload(filePath, {
			folder,
		});
		return result;
	} catch (error) {
		console.error('Cloudinary upload error:', error);
		throw error;
	}
};

export const deleteImage = async (publicId: string) => {
	try {
		const result = await cloudinary.uploader.destroy(publicId);
		return result;
	} catch (error) {
		console.error('Cloudinary delete error:', error);
		throw error;
	}
};
