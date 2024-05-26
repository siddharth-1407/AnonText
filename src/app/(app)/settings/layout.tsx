import { Metadata } from 'next';
import React, { ReactNode } from 'react';
import SettingsNav from '@/components/SettingsNav';

export const metadata: Metadata = {
	title: 'Settings',
	description:
		'AnonText is a secure and anonymous messaging platform that allows you to send and receive private messages without revealing your identity.',
	keywords: 'anonymous messaging, private messaging, secure chat, secret messages, hidden messages, anon chat, private conversations',
	applicationName: 'AnonText',
};

export default function layout({ children }: { children: ReactNode }) {
	return (
		<div className='h-full grid grid-cols-5 gap-4 pt-16 pb-8'>
			<div className='hidden md:block'>
				<SettingsNav />
			</div>
			{children}
		</div>
	);
}
