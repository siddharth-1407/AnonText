'use client';
import React from 'react';
import SentByMeCard from './SentByMeCard';
import { MessageSquareDashed } from 'lucide-react';

export default function MessagesSentByMeList({ messagesSentByMe, userData }: { messagesSentByMe: MessageCard[]; userData: UserProfileData }) {
	return (
		<>
			{messagesSentByMe.length > 0 ? (
				messagesSentByMe?.map((message: MessageCard) => {
					return (
						<React.Fragment key={message._id}>
							<SentByMeCard data={message} user={userData} />
						</React.Fragment>
					);
				})
			) : (
				<div className='grid place-items-center text-center gap-6 pt-20 lg:pt-36'>
					<span className='text-2xl md:text-4xl font-extrabold text-gray-950/50 dark:text-gray-600'>
						<MessageSquareDashed className='w-20 h-20 md:w-28 md:h-28 aspect-square' />
					</span>
					<span className='text-2xl md:text-4xl font-extrabold text-gray-950/50 dark:text-gray-600'>
						Sent your first message to {userData?.username}
					</span>
				</div>
			)}
		</>
	);
}
