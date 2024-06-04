import React from 'react';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

export default function SentByMeCard({ data, user }: { data: any; user: any }) {
	return (
		<Card className='dark:bg-gray-950'>
			<CardHeader className='flex-row items-center gap-4 py-4'>
				<Link className='flex gap-4 items-center' href={`/p/${data?.messageBy?.username}`}>
					<Avatar>
						<AvatarImage className='object-cover' src={data?.messageBy?.avatar?.url} />
						<AvatarFallback>{data?.messageBy?.username?.slice(0, 1)?.toUpperCase()}</AvatarFallback>
					</Avatar>
					<div>
						<span className='font-semibold'>{data?.messageBy?.username}</span>
					</div>
				</Link>
				{data?.isAnonymous && <Badge className='-translate-y-1 pb-0.5 text-xs'>Anonymous</Badge>}
			</CardHeader>
			<CardContent className='ml-14 whitespace-pre'>{data.content}</CardContent>
			{data?.reply && <Separator />}
			<CardFooter className='flex p-0 '>
				{data?.reply && (
					<div className='px-5 md:pl-16 py-3 flex gap-4'>
						<Avatar className='w-8 h-8'>
							<AvatarImage className='object-cover' src={user?.avatar?.url || ''} />
							<AvatarFallback>{user?.username?.slice(0, 1).toUpperCase()}</AvatarFallback>
						</Avatar>
						<p className='pt-0.5'>{data?.reply}</p>
					</div>
				)}
			</CardFooter>
		</Card>
	);
}
