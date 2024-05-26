import mongoose from 'mongoose';
import UserModel from '@/model/User.model';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/[...nextauth]/options';
import dbConnect from '@/lib/dbConnect';

export async function GET(req: Request) {
	await dbConnect();
	const { searchParams } = new URL(req.url);
	const queryParams = {
		username: searchParams.get('username') || '',
	};
	try {
		const session = await getServerSession(authOptions);
		if (!session || !session?.user) {
			return Response.json({ success: false, message: 'Not authenticated' }, { status: 403 });
		}
		const currentUserId = new mongoose.Types.ObjectId(session?.user?._id);
		const messages = await UserModel.aggregate([
			{
				$match: { username: queryParams.username },
			},
			{
				$lookup: {
					from: 'messages',
					let: { ownerId: '$_id' },
					pipeline: [
						{
							$match: {
								$expr: {
									$and: [{ $eq: ['$owner', '$$ownerId'] }, { $eq: ['$messageBy', currentUserId] }],
								},
							},
						},
						{
							$sort: { createdAt: -1 },
						},
						{
							$lookup: {
								from: 'users',
								localField: 'messageBy',
								foreignField: '_id',
								as: 'messageByUser',
							},
						},
						{
							$unwind: '$messageByUser',
						},
						{
							$project: {
								_id: 1,
								owner: 1,
								content: 1,
								reply: 1,
								messageBy: '$messageByUser',
								isAnonymous: 1,
								createdAt: 1,
								updatedAt: 1,
							},
						},
					],
					as: 'sentByMe',
				},
			},
			{
				$project: {
					_id: 0,
					sentByMe: 1,
				},
			},
		]);
		if (!messages) {
			return Response.json({ success: false, message: 'messages not found' }, { status: 404 });
		}
		return Response.json({ success: true, message: 'Messages fetched', data: messages?.[0]?.sentByMe }, { status: 200 });
	} catch (error) {
		console.log('Error getting messages sent by me: ', error);
		return Response.json({ success: false, message: 'Error getting message sent by me' }, { status: 500 });
	}
}
