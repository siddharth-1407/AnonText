'use client';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function page() {

	const settingNavLinks: NavLinks[] = [
		{
			id: 1,
			title: 'Profile',
			path: '/settings/profile',
		},
		{
			id: 2,
			title: 'Security',
			path: '/settings/security',
		},
	];
	return (
		<main className='grid col-span-5 gap-4 md:gap-6'>
			<h1 className='text-4xl font-semibold'>Settings</h1>
			<nav className='grid'>
				{settingNavLinks.map((item, i) => {
					return (
						<React.Fragment key={item.id}>
							<Link
								href={item.path}
								className='bg-blue-500/25 hover:bg-blue-500/40 dark:text-white dark:bg-gray-800 dark:hover:text-gray-50 dark:hover:bg-gray-700  bg-zinc-200  py-2 rounded-sm font-semibold px-6 my-0.5 transition-colors'>
								{item.title}
							</Link>
							{i !== settingNavLinks.length - 1 && <Separator />}
						</React.Fragment>
					);
				})}
			</nav>
		</main>
	);
}
