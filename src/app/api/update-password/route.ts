import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User.model';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/[...nextauth]/options';
import ChangePasswordSchema from '@/Schemas/ChangePasswordSchema';

export async function PATCH(request: Request) {
	await dbConnect();
	const { currentPassword, newPassword, confirmPassword } = await request.json();
	try {
		const session = await getServerSession(authOptions);
		const currentUser = session?.user;
		if (!session || !currentUser) {
			return Response.json({ success: false, message: 'not authenticated' }, { status: 403 });
		}

		const result = ChangePasswordSchema.safeParse({ currentPassword, newPassword, confirmPassword });
		if (!result.success) {
			const errors = result.error.format()?._errors.join(',');
			return Response.json({ success: false, message: errors || 'Please provide valid field values' }, { status: 400 });
		}
		const user = await UserModel.findById(currentUser._id);
		if (!user) {
			return Response.json({ success: false, message: 'user not found' }, { status: 404 });
		}
		const isCurrentPasswordCorrect = await user.isPasswordCorrect(currentPassword);
		if (!isCurrentPasswordCorrect) {
			return Response.json({ success: false, message: 'Incorrect password' }, { status: 400 });
		}
		user.password = newPassword;
		await user.save();
		return Response.json({ success: true, message: 'Password updated' }, { status: 200 });
	} catch (error) {
		console.error('Error updating password: ', error);
		return Response.json({ success: false, message: 'unexpected error occurred while updating password' }, { status: 500 });
	}
}
