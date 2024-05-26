import cloudinary from '@/lib/cloudinary';

export async function uploadedImageToCloudinary(localFilePath: string, options = {}) {
	if (!localFilePath) {
		return { success: false, message: 'local file path not provided' };
	}
	try {
		const res = await cloudinary.uploader.upload(localFilePath, options);
		return { success: true, data: res };
	} catch (error: any) {
		console.log(error);
		return { success: false, message: error.message || 'Error uploading file to cloudinary' };
	}
}
export async function deleteImageFromCloudinary(id: string) {
	if (!id) {
		return { success: false, message: 'id not provided' };
	}
	try {
		const res = await cloudinary.uploader.destroy(id);
		return { success: true, data: res };
	} catch (error: any) {
		console.log(error);
		return { success: false, message: error.message || 'Error deleting file to cloudinary' };
	}
}
