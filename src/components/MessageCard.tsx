'use client';
import React from 'react';
import ReplyDialog from './ReplyDialog';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function MessageCard({ data, user }: MessageCardProp): React.JSX.Element {
	const { data: session } = useSession();

	return (
		<Card className='dark:bg-gray-950'>
			<CardHeader className='flex-row gap-4 py-4'>
				{data?.isAnonymous ? (
					<>
						<Avatar>
							<AvatarImage src='' />
							<AvatarFallback>A</AvatarFallback>
						</Avatar>
						<div>
							<span className='font-semibold'>Anonymous</span>
						</div>
					</>
				) : (
					<Link className='flex gap-4 items-center' href={`/p/${data?.messageBy?.username}`}>
						<Avatar>
							<AvatarImage className='object-cover' src={data?.messageBy?.avatar?.url || ''} />
							<AvatarFallback>{data?.messageBy?.username?.slice(0, 1)?.toUpperCase()}</AvatarFallback>
						</Avatar>
						<div>
							<span className='font-semibold'>{data.isAnonymous ? 'Anonymous' : data?.messageBy?.username}</span>
						</div>
					</Link>
				)}
			</CardHeader>
			<CardContent className='ml-14'>{data.content}</CardContent>
			<Separator />
			<CardFooter className='flex p-0 '>
				{data?.reply ? (
					<div className='px-5 md:pl-16 py-3 flex gap-4'>
						<Avatar className='w-8 h-8'>
							<AvatarImage className='object-cover' src={user?.avatar?.url || ''} />
							<AvatarFallback>{user?.username?.slice(0, 1)?.toUpperCase()}</AvatarFallback>
						</Avatar>
						<p className='pt-0.5'>{data?.reply}</p>
					</div>
				) : (
					session && session?.user?._id == user._id && <ReplyDialog data={data} />
				)}
			</CardFooter>
		</Card>
	);
}
