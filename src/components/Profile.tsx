import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardHeader } from './ui/card';
import { numberFormatter } from '@/helpers/formatters';

export default async function Profile({ data }: { data: UserProfileData }) {
	return (
		<section className='py-8 md:pt-8 w-full flex flex-col md:flex-row gap-6 md:gap-12'>
			<div className='mx-auto md:mx-0 aspect-square w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full grid place-items-center ring'>
				<Avatar className='w-full h-full'>
					<AvatarImage className='object-cover' src={data?.avatar?.url} alt={`${data.username}'s profile picture`} />
					<AvatarFallback className='text-5xl md:text-6xl font-semibold'>{data?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
				</Avatar>
			</div>
			<div className='w-full flex flex-col justify-between gap-4 xs:gap-6'>
				<div className='text-center md:text-left'>
					<h1 className='text-2xl sm:text-3xl font-semibold'>{data?.username}</h1>
					<p className='py-2 sm:text-lg font-light'>{data.about}</p>
				</div>
				<div className='flex flex-col xs:flex-row gap-4 md:gap-6'>
					<Card className='dark:bg-gray-950 flex-1 max-w-sm shadow-sm'>
						<CardHeader className='flex flex-row items-end gap-2'>
							<p className='font-medium'>
								FeedBacks : <span className='font-normal'>{numberFormatter(data?.messageCount || 0)}</span>
							</p>
						</CardHeader>
					</Card>
				</div>
			</div>
		</section>
	);
}
