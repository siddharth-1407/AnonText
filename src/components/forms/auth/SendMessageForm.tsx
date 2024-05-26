'use client';
import * as z from 'zod';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import React, { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { BellOff, Loader2, Send } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { messageSchema } from '@/Schemas/message.schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

type SendMessageFormProps = {
	isLoading: boolean;
	isAcceptingMessages: boolean;
};
export default function SendMessageForm({ isLoading, isAcceptingMessages }: SendMessageFormProps) {
	const router = useRouter();
	const { toast } = useToast();
	const { username } = useParams<{ username: string }>();

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const form = useForm<z.infer<typeof messageSchema>>({
		defaultValues: {
			message: '',
			isAnonymous: true,
		},
		resolver: zodResolver(messageSchema),
	});

	const onSubmit: SubmitHandler<z.infer<typeof messageSchema>> = async (data: z.infer<typeof messageSchema>) => {
		setIsSubmitting(true);
		try {
			const res = await axios.post('/api/send-message', { message: data.message, isAnonymous: data.isAnonymous, username });
			if (res.data.success) {
				toast({
					title: 'Message sent!',
				});
				router.refresh();
			} else {
				toast({ title: res.data.message });
			}
		} catch (error: any) {
			console.error('Error sending message: ', error);
			toast({
				title: 'Error sending message/feedback',
				description: `${error?.response?.data?.message || 'An unexpected error occurred'}`,
				variant: 'destructive',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='flex flex-col gap-4'>
			{isLoading ? (
				<Loader2 className='mt-28 m-auto animate-spin w-32 h-32' />
			) : isAcceptingMessages ? (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='flex  flex-col gap-4'>
						<FormField
							name='message'
							control={form.control}
							render={({ field }) => (
								<FormItem className='flex flex-col gap-2'>
									<FormLabel className='text-xl font-medium'>Send a message/feedback</FormLabel>
									<FormControl>
										<Textarea
											className='min-h-48 text-lg'
											placeholder='Send a message/feedback'
											{...field}
											onChange={(e) => field.onChange(e)}
										/>
									</FormControl>
									<FormMessage className='text-red-500'></FormMessage>
									<FormDescription
										className={`${field.value?.toString().length > 300 ? 'text-red-500' : 'text-green-500'} font-semibold`}>
										{field.value?.toString().length || 0}/300
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							name='isAnonymous'
							control={form.control}
							render={({ field }) => (
								<FormItem className='flex flex-row-reverse w-fit items-center gap-4'>
									<FormLabel className='mt-1.5 text-xl font-medium'>Stay anonymous</FormLabel>
									<FormControl>
										<Switch checked={field.value} onCheckedChange={field.onChange} />
									</FormControl>
									<FormMessage className='text-red-500'></FormMessage>
								</FormItem>
							)}
						/>
						<Button type='submit' disabled={isSubmitting} className='flex items-center gap-1 text-lg font-medium'>
							{isSubmitting ? (
								<>
									<span>Sending</span>
									<Loader2 className='w-4 animate-spin' />
								</>
							) : (
								<>
									<span>Send</span>
									<Send className='w-4 rotate-45' />
								</>
							)}
						</Button>
					</form>
				</Form>
			) : (
				<NotAcceptingMessagesFallback username={username} />
			)}
		</div>
	);
}

function NotAcceptingMessagesFallback({ username }: { username: string }) {
	return (
		<div className='grid place-items-center text-center gap-6 pt-20 lg:pt-36'>
			<span className='text-2xl md:text-4xl font-extrabold text-gray-950/50 dark:text-gray-600'>
				<BellOff className='w-20 h-20 md:w-28 md:h-28 aspect-square' />
			</span>
			<span className='text-2xl md:text-4xl font-extrabold text-gray-950/50 dark:text-gray-600'>{username} is not accepting messages</span>
		</div>
	);
}
