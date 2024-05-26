import mongoose from 'mongoose';
import { User } from 'next-auth';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User.model';
import { getServerSession } from 'next-auth/next';
import authOptions from '../auth/[...nextauth]/options';

export async function GET(request: Request): Promise<Response> {
	await dbConnect();
	const session = await getServerSession(authOptions);
	const _user: User = session?.user as User;
	if (!session || !session?.user) {
		return Response.json(
			{
				success: false,
				message: 'Not Authenticated',
			},
			{ status: 401 }
		);
	}
	try {
		const userId = new mongoose.Types.ObjectId(_user._id);
		const user:
			| {
					_id: string;
					messages: MessageCard[];
			  }[]
			| null = await UserModel.aggregate([
			{
				$match: { _id: userId },
			},
			{
				$unwind: '$messages',
			},
			{
				$sort: { 'messages.createdAt': -1 },
			},
			{
				$project: {
					'messages._id': 1,
					'messages.content': 1,
					'messages.owner': 1,
					'messages.messageBy': 1,
					'message.reply': 1,
					'message.isAnonymous': 1,
				},
			},
			{
				$group: { _id: '$_id', messages: { $push: '$messages' } },
			},
		]);
		if (!user) {
			return Response.json({ success: false, message: 'user not found' }, { status: 404 });
		}
		return Response.json({ success: true, message: 'messages fetched', messages: user?.[0]?.messages }, { status: 200 });
	} catch (error) {
		console.error('Error getting messages: ', error);
		return Response.json({ success: false, message: 'Error getting messages' }, { status: 500 });
	}
}
