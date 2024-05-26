'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function ProfilePopOver({ data }: { data: UserProfileData }) {
	const NavLinks = [
		{
			id: 1,
			title: 'Profile',
			path: `/p/${data?.username}`,
		},
		{
			id: 2,
			title: 'Settings',
			path: '/settings/profile',
		},
	];
	return (
		<Popover>
			<PopoverTrigger>
				<Avatar className='ring-2 '>
					<AvatarImage className='object-cover' src={data?.avatar?.url} />
					<AvatarFallback className='dark:bg-gray-800 text-xl font-bold'>{data?.username?.slice(0, 1).toUpperCase()}</AvatarFallback>
				</Avatar>
			</PopoverTrigger>
			<PopoverContent className={'p-1 max-w-60 dark:bg-gray-950'}>
				<div className='flex flex-col text-center divide-y-2'>
					{NavLinks?.map((item) => {
						return (
							<React.Fragment key={item.id}>
								<Link href={item.path} className='rounded-sm py-2 hover:bg-blue-400/15 dark:hover:bg-blue-400/15'>
									{item.title}
								</Link>
							</React.Fragment>
						);
					})}
					<Button
						onClick={() => signOut()}
						className='rounded-sm flex gap-2 py-2 bg-white text-black dark:text-white dark:bg-gray-950 hover:bg-red-400/30 dark:hover:bg-red-500/15'>
						<LogOut className='w-5' />
						<span>Logout</span>
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
