import Wrapper from '@/components/ui/Wrapper';
import { Metadata } from 'next';
import React from 'react';

const aboutContent = {
	title: 'About Us',
	sections: [
		{
			id: 1,
			heading: 'Welcome to AnonText!',
			text: 'AnonText is a unique messaging platform designed to foster open communication and connection between users. Our mission is to provide a safe and anonymous space where you can express your thoughts, share your feelings, get feedbacks, and connect with others without the pressure of revealing your identity.',
		},
		{
			id: 2,
			heading: 'What We Offer',
			points: [
				{
					title: 'Anonymous Messaging',
					content:
						'Send messages anonymously or choose to reveal your identity, giving you the freedom to communicate in the way that feels right for you.',
				},
				{
					title: 'Private Conversations',
					content:
						'All messages are private and can only be seen by the sender and the recipient, ensuring your conversations remain confidential.',
				},
				{
					title: 'Single-Reply Interaction',
					content:
						'Users can ask a question or give feedbacks, and the recipient can provide one reply, keeping interactions focused and concise',
				},
				{
					title: 'Personalized Profiles',
					content:
						'Customize your profile by uploading an avatar making it other to identify you. Users can also share their profile links.',
				},
				{
					title: 'Message Control',
					content:
						'Users can decide whether or not they are accepting messages, providing flexibility and control over their communication.',
				},
				{
					title: 'Show Off Your Popularity',
					content:
						'Proudly display the number of messages you have received on your profile to show off your engagement and popularity within the app.',
				},
			],
		},
		{
			id: 3,
			heading: 'Why Choose AnonText?',
			points: [
				{
					title: 'Safety and Privacy',
					content:
						'We prioritize your privacy and security. Our platform ensures that your conversations remain between you and the person you’re communicating with.',
				},
				{
					title: 'User-Friendly Interface',
					content:
						'Our app is designed to be intuitive and easy to use, making it simple for you to send messages, update your profile, and manage your account settings.',
				},
				{
					title: 'Flexibility',
					content:
						'Whether you want to remain anonymous or share your identity, AnonText gives you the flexibility to choose how you communicate.',
				},
			],
		},
		{
			id: 4,
			heading: 'Our Commitment',
			text: 'At AnonText, we are committed to providing a space where you can freely express yourself and connect with others in meaningful ways. We continuously work to improve our platform and welcome your feedback to make your experience even better. Thank you for choosing AnonText! We hope you enjoy using our app as much as we enjoyed creating it for you.',
		},
		{
			id: 5,
			heading: 'Contact Us',
			text: 'Have questions or need assistance? Reach out to our support team at sanksiddharth@gmail.com or visit our Help Center for more information.',
		},
	],
};

export const metadata: Metadata = {
	title: 'About',
	description:
		'AnonText is a secure and anonymous messaging platform that allows you to send and receive private messages without revealing your identity.',
	keywords: 'anonymous messaging, private messaging, secure chat, secret messages, hidden messages, anon chat, private conversations',
	applicationName: 'AnonText',
};

export default function page() {
	return (
		<Wrapper>
			<main className='py-16'>
				<h1 className='text-5xl md:text-6xl font-extrabold pb-20'>{aboutContent.title}</h1>
				<div className='grid gap-8'>
					{aboutContent.sections.map((section) => {
						return <AboutSection data={section} />;
					})}
				</div>
			</main>
		</Wrapper>
	);
}

type AboutSection = {
	id: number;
	heading: string;
	text?: string;
	points?: { title: string; content: string }[];
};

export function AboutSection({ data }: { data: AboutSection }) {
	return (
		<section className='grid gap-4 lg:gap-6'>
			<h2 className='text-xl sm:text-3xl lg:text-4xl font-semibold'>{data?.heading}</h2>
			{data?.text && <p className='sm:text-lg'>{data?.text}</p>}
			{data?.points && (
				<div className='grid gap-4'>
					{data.points?.map((item, i) => {
						return (
							<div className='flex-inline pl-4 '>
								<span className='font-extrabold sm:text-xl'>{i + 1}. </span>
								<h3 className='font-semibold inline sm:text-xl'>{item.title} : </h3>
								<p className=' inline sm:text-lg'>{item.content}</p>
							</div>
						);
					})}
				</div>
			)}
		</section>
	);
}
