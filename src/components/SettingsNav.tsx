'use client';
import React from 'react';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { useSelectedLayoutSegment } from 'next/navigation';

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
export default function SettingsNav() {
	const segment = useSelectedLayoutSegment();
	return (
		<>
			{segment && (
				<aside>
					<nav className='grid'>
						{settingNavLinks.map((item, i) => {
							return (
								<React.Fragment key={item.id}>
									<Link
										href={item.path}
										className={`${
											item.path.endsWith(segment!)
												? 'bg-blue-500/25 hover:bg-blue-500/40 dark:text-white dark:bg-gray-800 dark:hover:text-gray-50 dark:hover:bg-gray-700 '
												: 'bg-zinc-200 hover:bg-zinc-300 dark:text-gray-400 dark:bg-gray-900 dark:hover:text-gray-200 dark:hover:bg-gray-700'
										} py-2 rounded-sm
                                font-semibold px-6 my-0.5`}>
										{item.title}
									</Link>
									{i !== settingNavLinks.length - 1 && <Separator />}
								</React.Fragment>
							);
						})}
					</nav>
				</aside>
			)}
		</>
	);
}
