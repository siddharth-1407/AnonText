import { User } from 'next-auth';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User.model';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/[...nextauth]/options';
import { acceptMessageSchema } from '@/Schemas/acceptMessage.schema';

export async function PATCH(request: Request) {
	await dbConnect();
	const session = await getServerSession(authOptions);
	const user: User = session?.user as User;
	if (!session || !session.user) {
		return Response.json({ success: false, message: 'Not Authenticated' }, { status: 401 });
	}
	const userId = user._id;
	const { isAcceptingMessages } = await request.json();
	try {
		const result = acceptMessageSchema.safeParse(isAcceptingMessages);
		if (!result.success) {
			const errors = result.error.format()._errors.join(',');
			return Response.json({ success: false, message: errors }, { status: 400 });
		}
		const updatedUser = await UserModel.findByIdAndUpdate(
			userId,
			{
				isAcceptingMessages,
			},
			{ new: true }
		);
		if (!updatedUser) {
			return Response.json({ success: false, message: 'failed to update user status to accept messages' }, { status: 401 });
		}
		return Response.json(
			{
				success: true,
				message: 'user status for accepting messages toggled successfully',
				data: { isAcceptingMessages: updatedUser.isAcceptingMessages },
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		console.error('Error sending message: ', error);
		return Response.json(
			{
				success: false,
				message: 'error sending message',
			},
			{ status: 500 }
		);
	}
}

export async function GET(request: Request) {
	await dbConnect();
	const { searchParams } = new URL(request.url);
	const queryParams = { username: searchParams.get('username') || '' };
	if (!queryParams.username) {
		return Response.json({ success: false, message: 'Username not provided' }, { status: 400 });
	}
	try {
		const user = await UserModel.findOne({ username: queryParams.username });

		if (!user) {
			return Response.json({ success: false, message: 'User not found' }, { status: 404 });
		}
		return Response.json({
			success: true,
			message: 'User status fetched successfully',
			data: { isAcceptingMessages: user.isAcceptingMessages },
		});
	} catch (error) {
		console.error('Error getting user status for accepting messages: ', error);
		return Response.json({ success: false, message: 'Error getting user status for accepting messages' }, { status: 500 });
	}
}
