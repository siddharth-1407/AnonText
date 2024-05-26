import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User.model';
import MessageModel, { Message } from '@/model/Message.model';
import { messageSchema } from '@/Schemas/message.schema';
import { User, getServerSession } from 'next-auth';
import authOptions from '../auth/[...nextauth]/options';

export async function POST(request: Request) {
	await dbConnect();
	const session = await getServerSession(authOptions);
	const _user: User = session?.user as User;
	if (!session || !session.user) {
		return Response.json(
			{
				success: false,
				message: 'Not Authenticated',
			},
			{ status: 401 }
		);
	}
	const currentUserId = _user._id;
	const { message, isAnonymous, username } = await request.json();
	try {
		const result = messageSchema.safeParse({ message });
		if (!result.success) {
			const messageErrors = result.error.format()._errors.join(',');
			return Response.json({ success: false, message: messageErrors }, { status: 400 });
		}
		const user = await UserModel.findOne({ username });
		if (!user) {
			return Response.json({ success: false, message: 'user not found' }, { status: 404 });
		}
		if (!user.isAcceptingMessages) {
			return Response.json({ success: false, message: 'user is not accepting messages' }, { status: 403 });
		}
		let newMessage = new MessageModel({
			content: message,
			owner: user._id,
			messageBy: currentUserId,
			isAnonymous,
		});
		newMessage = await newMessage.save();
		user.messages.push(newMessage as Message);
		await user.save();
		return Response.json({ success: true, message: 'Message sent successfully' }, { status: 200 });
	} catch (error) {
		console.error('error sending message: ', error);
		return Response.json({ success: false, message: 'Error sending message' }, { status: 500 });
	}
}
