import ReplySchema from '@/Schemas/reply.schema';
import MessageModel from '@/model/Message.model';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/[...nextauth]/options';
import dbConnect from '@/lib/dbConnect';

export async function POST(request: Request) {
	await dbConnect()
	const { id, content } = await request.json();
	try {
		const session = await getServerSession(authOptions);
		if (!session || !session?.user) {
			return Response.json({ success: false, message: 'Not authenticated' }, { status: 403 });
		}
		const result = ReplySchema.safeParse({ id, reply: content });
		if (!result.success) {
			const errors = result?.error?.format()?._errors?.join(',');
			return Response.json({ success: false, message: errors || 'Error sending message' }, { status: 400 });
		}
		const message = await MessageModel.findById(id);
		if (!message) {
			return Response.json({ success: false, message: 'Message not found' }, { status: 404 });
		}
		message.reply = result?.data?.reply;
		await message.save();
		return Response.json({ success: true, message: 'reply created!' }, { status: 200 });
	} catch (error) {
		console.error('Error sending reply: ', error);
		return Response.json({ success: false, message: 'Error sending message' }, { status: 500 });
	}
}
