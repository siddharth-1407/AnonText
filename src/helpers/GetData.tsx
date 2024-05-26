'use server';
import authOptions from '@/app/api/auth/[...nextauth]/options';
import dbConnect from '@/lib/dbConnect';
import MessageModel from '@/model/Message.model';
import UserModel from '@/model/User.model';
import mongoose from 'mongoose';
import { User, getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';

export async function getUserData(username: string) {
	await dbConnect();
	const user = await UserModel.aggregate([
		{
			$match: {
				username,
			},
		},
		{
			$addFields: {
				messageCount: { $size: '$messages' },
			},
		},
		{
			$unset: ['password', 'verifyCode', 'verifyCodeExpiry', 'messages', 'isVerified', '__v'],
		},
	]);
	if (!user) {
		console.error('user not found');
		return false;
	}
	return user?.[0] as UserProfileData;
}

export const getMessages = async () => {
	await dbConnect();
	const session = await getServerSession(authOptions);
	const _user: User = session?.user as User;
	if (!session || !session?.user) {
		redirect('sign-in');
	}

	const userId = new mongoose.Types.ObjectId(_user._id);
	const user = (await MessageModel.aggregate([
		{
			$match: { owner: userId },
		},
		{
			$lookup: {
				from: 'users',
				let: { messageById: '$messageBy', includeUserData: { $cond: { if: { $eq: ['$isAnonymous', false] }, then: true, else: false } } },
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [{ $eq: ['$_id', '$$messageById'] }, { $eq: ['$$includeUserData', true] }],
							},
						},
					},
					{
						$project: {
							_id: 1,
							username: 1,
							avatar: 1,
						},
					},
				],
				as: 'messageBy',
			},
		},
		{
			$addFields: {
				messageBy: { $arrayElemAt: ['$messageBy', 0] },
			},
		},
		{
			$sort: { createdAt: -1 },
		},
	])) as MessageCard[];
	if (!user) {
		notFound();
	}
	return user;
};
