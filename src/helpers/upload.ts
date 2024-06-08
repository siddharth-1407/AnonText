import cloudinary from '@/lib/cloudinary';
import { UploadApiResponse } from 'cloudinary';

export async function uploadedImageToCloudinary(file: File, options = {}) {
	if (!file) {
		return { success: false, message: 'local file path not provided' };
	}
	try {
		const arrayBuffer = await file.arrayBuffer();
		const buffer = new Uint8Array(arrayBuffer);
		const res: UploadApiResponse | undefined = await new Promise((resolve, reject) =>
			cloudinary.uploader
				.upload_stream(options, function (err, data) {
					if (err) {
						reject(err);
						return;
					}
					resolve(data);
				})
				.end(buffer)
		);
		if (res) {
			const { secure_url, public_id } = res;
			return { success: true, data: { secure_url, public_id } };
		}
		return { success: false, message: 'Error uploading file to cloudinary' };
	} catch (error: any) {
		console.log(error);
		return { success: false, message: error.message || 'Error uploading file to cloudinary' };
	}
}

// export async function uploadedImageToCloudinary(localFilePath: string, options = {}) {
// 	if (!localFilePath) {
// 		return { success: false, message: 'local file path not provided' };
// 	}
// 	try {
// 		const res = await cloudinary.uploader.upload(localFilePath, options);
// 		return { success: true, data: res };
// 	} catch (error: any) {
// 		console.log(error);
// 		return { success: false, message: error.message || 'Error uploading file to cloudinary' };
// 	}
// }
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
