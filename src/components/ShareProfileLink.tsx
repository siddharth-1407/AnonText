'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import { Button } from './ui/button';
import { Check } from 'lucide-react';

export default function ShareProfileLink() {
	const { data: session } = useSession();
	const user: User = session?.user as User;
	const [copied, setCopied] = useState(false);
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (copied) setCopied(false);
		}, 1500);
		return () => clearTimeout(timeout);
	}, [copied]);

	const handleCopyToClipboard = () => {
		if (typeof window !== 'undefined') {
			window.navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/p/${user?.username}`);
			setCopied(true);
		}
	};
	return (
		<section>
			<Card className='dark:bg-gray-950 shadow-sm'>
				<CardHeader className='text-xl sm:text-2xl font-medium sm:font-semibold'>Share profile link</CardHeader>
				<CardContent className='flex justify-between items-center'>
					<p>
						{window?.location?.host}/p/{user?.username}
					</p>
					<Button onClick={handleCopyToClipboard} className='flex'>
						<span>{copied ? 'Copied' : 'Copy'}</span>
						<span className={`${copied ? 'opacity-100 ml-4' : 'opacity-0'} transition-opacity duration-500`}>
							{copied && <Check className='w-4' />}
						</span>
					</Button>
				</CardContent>
			</Card>
		</section>
	);
}
