import { unlink } from 'fs';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User.model';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/[...nextauth]/options';
import UpdateProfileSchema from '@/Schemas/UpdateProfileSchema';
import { deleteImageFromCloudinary, uploadedImageToCloudinary } from '@/helpers/upload';

export async function PATCH(request: Request) {
	await dbConnect();
	const formData = await request.formData();
	const avatar = formData.get('avatar');
	const status = formData.get('status') || undefined;

	try {
		const session = await getServerSession(authOptions);
		const currentUser = session?.user;
		let uploadedImage;
		// check session
		if (!session || !currentUser) {
			return Response.json({ success: false, message: 'not authorized' }, { status: 403 });
		}
		// data validation via zod
		const result = UpdateProfileSchema.safeParse({ avatar, status });
		if (!result.success) {
			console.log(result);
			const errors = result?.error?.format()?._errors.join(',');
			return Response.json({ success: false, message: errors || 'Invalid values' }, { status: 400 });
		}

		if (avatar) {
			uploadedImage = await uploadedImageToCloudinary(avatar as File, { folder: '/AnonText/avatars', format: 'jpg', width: 350, hight: 350 });
			console.log(uploadedImage);
			if (!uploadedImage.success) {
				console.log('Error while uploading image to cloudinary');
				return Response.json({ success: false, message: uploadedImage.message || 'Error while uploading file' }, { status: 500 });
			}
			if (!uploadedImage?.data?.secure_url) {
				console.error('Error uploading file : public url not returned');
				return Response.json({ success: false, message: 'Error while uploading file' }, { status: 500 });
			}
		}
		const user = await UserModel.findById(currentUser?._id);
		if (!user) {
			return Response.json({ success: false, message: 'user not found' }, { status: 404 });
		}
		if (avatar) {
			if (user?.avatar) {
				const deletedAvatar = await deleteImageFromCloudinary(user?.avatar?.id);
				if (!deletedAvatar.success) {
					return Response.json({ success: false, message: 'Error while updating profile' }, { status: 500 });
				}
			}
			if (uploadedImage) {
				user.avatar = {
					id: uploadedImage?.data?.public_id,
					url: uploadedImage?.data?.secure_url,
				};
			}
		}
		if (status) {
			user.about = String(status);
		}
		await user.save();
		return Response.json({ success: true, message: 'profile updated!' }, { status: 200 });
	} catch (error) {
		console.log('Error updating profile', error);
		return Response.json({ success: false, message: 'unexpected error occurred while updating profile' }, { status: 500 });
	}
	// finally {
	// 	if (avatar) {
	// 		await unlink(avatar, (err) => console.log(err));
	// 	}
	// }
}
