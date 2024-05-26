'use client';
import * as z from 'zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useState } from 'react';
import { acceptMessageSchema } from '@/Schemas/acceptMessage.schema';
import { FormField, Form, FormItem, FormLabel, FormControl } from '@/components/ui/form';

const isAcceptingMessageSchema = z.object({
	isAcceptingMessages: acceptMessageSchema,
});

export default function ToggleIsAcceptingMessagesForm({ initialValue = false }) {
	const { toast } = useToast();
	const { update } = useSession();
	const [isLoading, setIsLoading] = useState(false);
	const { data: session } = useSession();

	const form = useForm<z.infer<typeof isAcceptingMessageSchema>>({
		defaultValues: { isAcceptingMessages: initialValue },
		resolver: zodResolver(isAcceptingMessageSchema),
	});
	const isAcceptingMessages = form.watch('isAcceptingMessages');

	const getStatusIsAcceptingMessages = useCallback(async () => {
		setIsLoading(true);
		try {
			const res = await axios.get(`/api/accept-message?username=${session?.user?.username}`);

			if (res.data?.success) {
				form.setValue('isAcceptingMessages', res.data?.data?.isAcceptingMessages);
			} else {
				toast({ description: res.data?.message, variant: 'destructive' });
			}
		} catch (error) {
			console.error('Error getting isAcceptingMessages status: ', error);
			toast({ description: 'unexpected error getting Accept-messages status', variant: 'destructive' });
		} finally {
			setIsLoading(false);
		}
	}, [session]);

	const toggleIsAcceptingMessages = useCallback(async () => {
		setIsLoading(true);
		try {
			const res = await axios.patch('/api/accept-message', { isAcceptingMessages: !isAcceptingMessages });
			if (res.data?.success) {
				form.setValue('isAcceptingMessages', res.data?.data?.isAcceptingMessages);
				update({ isAcceptingMessages: res.data?.data?.isAcceptingMessages });
			} else {
				toast({ description: res.data?.message, variant: 'destructive' });
			}
		} catch (error) {
			console.error('Error getting isAcceptingMessages status: ', error);
			toast({ description: 'Unexpected error while toggling status', variant: 'destructive' });
		} finally {
			setIsLoading(false);
		}
	}, [isAcceptingMessages]);

	useEffect(() => {
		if (session?.user) {
			getStatusIsAcceptingMessages();
		}
	}, [session]);

	return (
		<div className='flex gap-2'>
			<Form {...form}>
				<form>
					<FormField
						name='isAcceptingMessages'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Switch
										{...form.register('isAcceptingMessages')}
										onCheckedChange={toggleIsAcceptingMessages}
										checked={isAcceptingMessages}
										disabled={isLoading}
									/>
								</FormControl>
								<FormLabel className='cursor-pointer'>
									<p className='font-medium'>
										Accept Messages :{' '}
										{isAcceptingMessages ? (
											<span className='font-bold text-green-500'>ON</span>
										) : (
											<span className='font-bold text-red-500'>OFF</span>
										)}
									</p>
								</FormLabel>
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	);
}
