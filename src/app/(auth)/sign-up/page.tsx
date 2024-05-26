import React from 'react';
import { Metadata } from 'next';
import SignUpForm from '@/components/forms/auth/Sign-upForm';
import { Meteors } from '@/components/ui/Meteors';

export const metadata: Metadata = {
	title: 'Sign Up',
	description:
		'AnonText is a secure and anonymous messaging platform that allows you to send and receive private messages without revealing your identity.',
	keywords: 'anonymous messaging, private messaging, secure chat, secret messages, hidden messages, anon chat, private conversations',
	applicationName: 'AnonText',
};

const whyJoin = [
	{
		title: 'Stay Anonymous or Not',
		description: 'You decide if you want to reveal your identity or keep it hidden.',
		customStyles: 'after:bg-pink-500 dark:after:bg-pink-600',
	},
	{
		title: 'Control Your Privacy',
		description: 'Easily toggle your availability to receive messages and manage your profile settings.',
		customStyles: 'after:bg-blue-400 dark:after:bg-blue-600',
	},
	{
		title: 'Organize Your Messages',
		description: "Keep track of all the messages you've received and sent in one convenient place.",
		customStyles: 'after:bg-green-400 dark:after:bg-green-600',
	},
];

export default function page(): React.JSX.Element {
	return (
		<div className='h-full flex-1 flex items-center container max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl mx-auto '>
			<main className='relative overflow-hidden border-2 rounded-xl border-primary/05 flex gap-6 flex-1 lg:p-16 xl:p-20'>
				<Meteors number={40} />
				<aside className='z-10 flex-1 hidden lg:grid justify-center gap-10'>
					<div className='max-w-lg'>
						<h1 className='text-[clamp(1.75rem,3vw,3.2rem)] leading-tight font-bold my-1'>Join the Conversation</h1>
						<p className='text-[clamp(1.25rem,2vw,1.3rem)] font-medium my-1'>Sign up now and start connecting anonymously</p>
					</div>
					<div className='max-w-lg flex flex-col gap-4'>
						<p className='text-[clamp(1.25rem,2vw,1.75rem)] font-bold'>Why join?</p>
						<ul className='grid gap-3 2xl:gap-4'>
							{whyJoin.map((item: { title: string; description: string; customStyles: string }, index: number) => {
								return (
									<li>
										<p className='group'>
											<span
												className={`px-1 z-10 text-[clamp(1rem,2vw,1.135rem)] font-semibold relative after:absolute after:left-0 after:top-0 after:h-full after:w-0 ${item.customStyles} group-hover:after:w-full after:-skew-x-12 after:-z-10 after:transition-all`}>
												{item.title}
											</span>
											: <span className='font-light'>{item.description}</span>
										</p>
									</li>
								);
							})}
						</ul>
					</div>
				</aside>
				<section className='z-10 relative flex-1 grid place-items-center'>
					<SignUpForm />
				</section>
			</main>
		</div>
	);
}
