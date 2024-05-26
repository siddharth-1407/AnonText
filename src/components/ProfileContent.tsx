'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useToast } from './ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SendMessageForm from '@/components/forms/auth/SendMessageForm';
import { useParams } from 'next/navigation';
import MessageCard from './MessageCard';
import SentByMeCard from './SentByMeCard';
import MessagesSentByMeList from './MessagesSentByMeList';

export default function ProfileContent({ userData }: { userData: UserProfileData }) {
	const { toast } = useToast();
	const { username } = useParams<{ username: string }>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isAcceptingMessages, setIsAcceptingMessages] = useState<boolean>(false);
	const [messagesSentByMe, setMessagesSentByMe] = useState([]);

	useEffect(() => {
		const getAcceptMessagesStatus = async () => {
			try {
				const res = await axios.get(`/api/accept-message?username=${username}`);
				if (res.data?.success) {
					setIsAcceptingMessages(res.data?.data?.isAcceptingMessages);
				} else {
					toast({ title: res.data?.message, variant: 'destructive' });
				}
			} catch (error: any) {
				console.error('error getting isAcceptingMessages status: ', error);
				toast({ title: error?.response?.data.message || 'something went wrong', variant: 'destructive' });
				return error?.response.data;
			} finally {
				setIsLoading(false);
			}
		};
		getAcceptMessagesStatus();
	}, []);
	useEffect(() => {
		const getMessagesSentByMe = async () => {
			try {
				const res = await axios.get(`/api/sent-by-me?username=${username}`);

				if (res.data?.success) {
					setMessagesSentByMe(res.data?.data);
				} else {
					toast({ title: res.data?.message, variant: 'destructive' });
				}
			} catch (error: any) {
				console.error('error getting isAcceptingMessages status: ', error);
				toast({ title: error?.response?.data.message || 'something went wrong', variant: 'destructive' });
				return error?.response.data;
			}
		};
		getMessagesSentByMe();
	}, []);
	return (
		<Tabs defaultValue='message-form'>
			<TabsList className='w-full h-auto gap-1 py-1'>
				<TabsTrigger value='message-form' className='w-full text-lg'>{`Message ${username}`}</TabsTrigger>
				<TabsTrigger value='sent-by-me' className='w-full text-lg'>
					Sent by me
				</TabsTrigger>
			</TabsList>
			<TabsContent value='message-form'>
				<SendMessageForm isLoading={isLoading} isAcceptingMessages={isAcceptingMessages} />
			</TabsContent>
			<TabsContent value='sent-by-me' className='grid gap-4'>
				<MessagesSentByMeList messagesSentByMe={messagesSentByMe} userData={userData} />
			</TabsContent>
		</Tabs>
	);
}
