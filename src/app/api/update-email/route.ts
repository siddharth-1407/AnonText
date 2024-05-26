import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User.model';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/[...nextauth]/options';
import ChangeEmailSchema from '@/Schemas/ChangeEmail.schema';

export async function PATCH(request: Request): Promise<Response> {
	await dbConnect();
	const { email, currentPassword } = await request.json();
	try {
		const session = await getServerSession(authOptions);
		const currentUser = session?.user;
		if (!session || !currentUser) {
			return Response.json({ success: false, message: 'not authenticated' }, { status: 403 });
		}
		const result = ChangeEmailSchema.safeParse({ email, currentPassword });
		if (!result.success) {
			const errors = result?.error?.format()?._errors.join(',');
			return Response.json({ success: false, message: errors || 'please provide a valid email or password' }, { status: 400 });
		}
		const user = await UserModel.findById(currentUser?._id);
		if (!user) {
			return Response.json({ success: false, message: 'User not found' }, { status: 404 });
		}
		const isPasswordCorrect: boolean = await user.isPasswordCorrect(currentPassword);
		if (!isPasswordCorrect) {
			return Response.json({ success: false, message: 'Incorrect password' }, { status: 400 });
		}
		if (user.email == email) {
			return Response.json({ success: false, message: 'new email can not be the same as the current email' }, { status: 400 });
		}
		user.email = email;
		await user.save({ validateBeforeSave: false });
		return Response.json({ success: true, message: 'Email updated successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error updating email: ', error);
		return Response.json({ success: false, message: 'unexpected error occurred while updating email' }, { status: 500 });
	}
}
