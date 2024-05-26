import React from 'react';
import { Metadata } from 'next';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User.model';
import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';
import authOptions from '@/app/api/auth/[...nextauth]/options';
import UpdateProfile from '@/components/forms/auth/UpdateProfile';


export const metadata: Metadata = {
	title: 'Profile - Settings',
	description:
		'AnonText is a secure and anonymous messaging platform that allows you to send and receive private messages without revealing your identity.',
	keywords: 'anonymous messaging, private messaging, secure chat, secret messages, hidden messages, anon chat, private conversations',
	applicationName: 'AnonText',
};

async function getProfileData() {
	await dbConnect();
	const session = await getServerSession(authOptions);
	const currentUser = session?.user;
	if (!session || !currentUser) {
		redirect('/sign-in');
	}
	const user = await UserModel.findById(currentUser?._id).select('-password -verifyCode -verifyCodeExpiry -_id -__v -messages').lean();
	if (!user) {
		notFound();
	}
	return user;
}

export default async function SettingProfilePage() {
	const userProfileData = await getProfileData();
	return (
		<main className='dark:bg-white/5 col-span-5 md:col-span-4 rounded-md'>
			<div className='w-full h-full p-1 rounded-lg grid gap-1 overflow-hidden md:col-span-4 '>
				<UpdateProfile userData={userProfileData} />
			</div>
		</main>
	);
}
