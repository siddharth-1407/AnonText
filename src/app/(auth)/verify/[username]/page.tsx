import VerifyUsernameForm from '@/components/forms/auth/VerifyUsernameForm';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'Verify',
	description:
		'AnonText is a secure and anonymous messaging platform that allows you to send and receive private messages without revealing your identity.',
	keywords: 'anonymous messaging, private messaging, secure chat, secret messages, hidden messages, anon chat, private conversations',
	applicationName: 'AnonText',
};

export default function page({ params }: { params: string }) {
	return (
		<div className='h-full flex-1 flex container max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl mx-auto'>
			<VerifyUsernameForm />
		</div>
	);
}
