import React from 'react';
import { Metadata } from 'next';
import UpdateEmailForm from '@/components/forms/auth/UpdateEmailForm';
import UpdatePasswordForm from '@/components/forms/auth/UpdatePasswordForm';

export const metadata: Metadata = {
	title: 'Security - Settings',
	description:
		'AnonText is a secure and anonymous messaging platform that allows you to send and receive private messages without revealing your identity.',
	keywords: 'anonymous messaging, private messaging, secure chat, secret messages, hidden messages, anon chat, private conversations',
	applicationName: 'AnonText',
};
export default function SettingSecurityPage() {
	return (
		<main className='dark:bg-white/5 col-span-5 md:col-span-4 rounded-md'>
			<div className='w-full h-full p-1 rounded-lg grid gap-1 overflow-hidden md:col-span-4 '>
				<UpdateEmailForm />
				<UpdatePasswordForm />
			</div>
		</main>
	);
}
