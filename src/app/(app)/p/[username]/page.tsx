import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Profile from '@/components/Profile';
import { getUserData } from '@/helpers/GetData';
import { Metadata, ResolvingMetadata } from 'next';
import { Session,getServerSession } from 'next-auth';
import { Separator } from '@/components/ui/separator';
import ProfileContent from '@/components/ProfileContent';
import authOptions from '@/app/api/auth/[...nextauth]/options';

export const revalidate = 0;

type pageProps = {
	params: { username: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: { params: string }, parent: ResolvingMetadata): Promise<Metadata> {
	const session = await getServerSession(authOptions);
	const username = session?.user?.username;
	return {
		title: username,
		description:
				'AnonText is a secure and anonymous messaging platform that allows you to send and receive private messages without revealing your identity.',
			keywords: 'anonymous messaging, private messaging, secure chat, secret messages, hidden messages, anon chat, private conversations',
	};
}


export default async function ProfilePage({ params }: pageProps) {
	const session: Session | null = await getServerSession(authOptions);
	const userData: UserProfileData | boolean = await getUserData(params.username);
	if (!userData) {
		notFound();
	}
	return (
		<main className='mt-4 2xl:mt-8 flex flex-col gap-6'>
			<Profile data={userData} />
			<Separator />

			{!session || !session?.user ? (
				<NoAuthFallback user={params.username} />
			) : session?.user?._id !== userData?._id?.toString() ? (
				<ProfileContent userData={userData} />
			) : null}
		</main>
	);
}

function NoAuthFallback({ user }: { user: string }) {
	return (
		<section className='grid place-items-center gap-4 md:gap-6 lg:gap-8 text-center pt-16 md:pt-24 lg:pt-28 2xl:pt-32'>
			<h2 className='max-w-sm text-xl sm:text-2xl md:max-w-md md:text-3xl 2xl:max-w-lg 2xl:font-semibold'>
				Login to start sending messages to {user}
			</h2>
			<Link
				href={'/sign-in'}
				className={'px-4 py-2 bg-blue-950 dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:opacity-85 transition-all'}>
				Login
			</Link>
		</section>
	);
}
