import React from 'react';
import { Container, Head, Hr, Html, Preview, Section, Tailwind, Text, Body } from '@react-email/components';

interface VerificationEmailProp {
	username: string;
	verifyCode: string;
}

export default function VerificationEmail({ username, verifyCode }: VerificationEmailProp): React.JSX.Element {
	return (
		<Html className='border'>
			<Head />
			<Preview>
				Thank you for signing up with AnonText! To complete your registration and verify, please use the verification code below:
			</Preview>
			<Tailwind>
				<Body className='bg-white my-auto mx-auto font-sans px-2'>
					<Container className='border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]'>
						<h1 className='text-black text-3xl font-bold text-center p-0 my-12 mx-0'>AnonText</h1>
						<Section>
							<Text className='font-medium font-sans text-normal leading-6'>Hi {username},</Text>
							<Text className='font-sans text-normal leading-6'>
								Thank you for signing up with AnonText! To complete your registration and verify, please use the verification code
								below:
							</Text>
							<Text className='font-sans text-normal leading-6'>
								Verification Code: <span className='font-bold'>{verifyCode}</span>
							</Text>
						</Section>
						<Section className=' text-normal leading-6'>
							<Text className='font-sans m-0'>Thank you for choosing AnonText! </Text>
							<Text className='font-sans mt-2 mb-0'> Best regards, </Text>
							<Text className='font-sans m-0'>The AnonText Team </Text>
						</Section>
						<Hr />
						<Section>
							<Text className='m-0 text-gray-600'>If you did not request this email, please ignore it.</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
