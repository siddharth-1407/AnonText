import { Metadata } from 'next';
import SignInForm from '@/components/forms/auth/Sign-inForm';
import { AuroraBackground } from '@/components/ui/AuroraBackground';

export const metadata: Metadata = {
	title: 'Sign In',
	description:
		'AnonText is a secure and anonymous messaging platform that allows you to send and receive private messages without revealing your identity.',
	keywords: 'anonymous messaging, private messaging, secure chat, secret messages, hidden messages, anon chat, private conversations',
	applicationName: 'AnonText',
};

export default function Page() {
	return (
		<div className='h-full flex-1 flex items-center sm:container max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl mx-auto '>
			<div className='relative overflow-hidden border-2 rounded-xl border-primary/05 flex gap-6 flex-1'>
				<AuroraBackground className='flex-1 w-full h-full dark:bg-gray-950'>
					<section className='z-10 flex-1 grid place-items-center md:my-10 lg:my-0 lg:p-16 xl:p-20'>
						<SignInForm />
					</section>
				</AuroraBackground>
			</div>
		</div>
	);
}
