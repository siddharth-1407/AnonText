import React from 'react';
import MessageCard from './MessageCard';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { getUserData } from '@/helpers/GetData';

export default function Messages({ data }: { data: MessageCard[] }) {
	return <div>{data?.length > 0 ? <MessagesList messages={data} /> : <MessagesListFallBack />}</div>;
}

async function MessagesList({ messages }: { messages: MessageCard[] }) {
	const session = await getServerSession(authOptions);
	if (!session || !session?.user) {
		redirect('/sign-in');
	}
	const userData = await getUserData(session?.user?.username!);
	if (!userData) {
		throw new Error('Error getting user data');
	}
	return (
		<div className='grid gap-4 py-4'>
			{messages.map((message, i) => {
				return (
					<React.Fragment key={i}>
						<MessageCard user={userData} data={message} />
					</React.Fragment>
				);
			})}
		</div>
	);
}

function MessagesListFallBack() {
	return (
		<div className='grid place-items-center gap-2 pt-20 lg:pt-36'>
			<span className='text-2xl md:text-4xl font-extrabold text-gray-950/50 dark:text-gray-600'>You've no messages</span>
			<span className='text-lg md:text-2xl font-extrabold text-gray-950/50 dark:text-gray-600'>Share your profile link</span>
		</div>
	);
}
