'use client';
import React, { useEffect, useState } from 'react';
import ToggleTheme from './ToggleTheme';
import ProfilePopOver from './ProfilePopOver';
import { Session } from 'next-auth';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { PT_Sans } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { getUserData } from '@/helpers/GetData';
import { useSession } from 'next-auth/react';

const navLinks = [
	{
		id: 1,
		title: 'Home',
		path: '/',
		onAuth: false,
	},
	{
		id: 2,
		title: 'Dashboard',
		path: '/dashboard',
		onAuth: true,
	},
	{
		id: 3,
		title: 'About',
		path: '/about',
		onAuth: false,
	},
];
export const PTSans = PT_Sans({ subsets: ['latin'], weight: ['400', '700'] });

export default function NavbarDesktop({
	serverSession,
	serverUserData,
}: {
	serverSession: Session | null;
	serverUserData: UserProfileData | boolean | null;
}) {
	let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	let [userData, setUserData] = useState<UserProfileData | boolean | null>(null);
	const pathname = usePathname();
	const { data: session } = useSession();
	useEffect(() => {
		async function fetchUserData() {
			if (session?.user) {
				const data: UserProfileData | boolean | null = await getUserData(session?.user?.username!);
				setUserData(data);
			}
		}
		fetchUserData();
	}, [session]);

	return (
		<div className='container max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl mx-auto  hidden md:flex justify-between items-center'>
			<Link href={'/'} className={`grid place-items-center font-bold text-xl px-4 py-1 rounded-lg bg-blue-200 dark:bg-blue-500 ${PTSans}`}>
				AnonText
			</Link>
			<nav className='flex gap-8' onMouseLeave={() => setHoveredIndex(null)}>
				{navLinks.map((link, index) => {
					if ((serverSession?.user || session?.user) && link.onAuth) {
						return (
							<Link
								key={link.id}
								href={link.path}
								onMouseEnter={() => setHoveredIndex(index)}
								className={`text-lg font-medium relative px-4 rounded-md ${
									pathname === link.path && 'bg-blue-300 dark:bg-blue-500'
								}`}>
								{link.title}
								<AnimatePresence>
									{hoveredIndex == index && (
										<motion.span
											layoutId='background'
											className='absolute inset-0 rounded-lg bg-blue-800/50 dark:bg-blue-300/50'
											initial={{ opacity: 0 }}
											animate={{ opacity: 1, transition: { duration: 0.15 } }}
											exit={{
												opacity: 0,
												transition: { duration: 0.15, delay: 0.2 },
											}}></motion.span>
									)}
								</AnimatePresence>
							</Link>
						);
					} else if (!link.onAuth) {
						return (
							<Link
								key={link.id}
								href={link.path}
								onMouseEnter={() => setHoveredIndex(index)}
								className={`text-lg font-medium relative px-4 rounded-md transition-colors ${
									pathname === link.path && 'bg-blue-300 dark:bg-blue-500'
								}`}>
								{link.title}
								<AnimatePresence>
									{hoveredIndex == index && (
										<motion.span
											layoutId='background'
											className='absolute inset-0 rounded-md bg-blue-800/10 dark:bg-blue-100/10'
											initial={{ opacity: 0 }}
											animate={{ opacity: 1, transition: { duration: 0.15 } }}
											exit={{
												opacity: 0,
												transition: { duration: 0.15, delay: 0.2 },
											}}></motion.span>
									)}
								</AnimatePresence>
							</Link>
						);
					}
				})}
			</nav>
			<div className='flex gap-6'>
				<ToggleTheme />
				{!serverUserData && !userData ? (
					<Link href={'/sign-in'} className='bg-blue-950 hover:bg-blue-950/95 py-2 px-4 text-white rounded-sm'>
						Login
					</Link>
				) : (
					userData && typeof userData !== 'boolean' && <ProfilePopOver data={userData} />
				)}
			</div>
		</div>
	);
}
