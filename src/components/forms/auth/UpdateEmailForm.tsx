'use client';
import { z } from 'zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import ChangeEmailSchema from '@/Schemas/ChangeEmail.schema';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export default function UpdateEmailForm() {
	const session = useSession();
	const { toast } = useToast();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const form = useForm<z.infer<typeof ChangeEmailSchema>>({
		defaultValues: {
			email: session?.data?.user?.email || '',
			currentPassword: '',
		},
		resolver: zodResolver(ChangeEmailSchema),
	});
	const onSubmit: SubmitHandler<z.infer<typeof ChangeEmailSchema>> = async (data: z.infer<typeof ChangeEmailSchema>) => {
		setIsSubmitting(true);
		try {
			const res = await axios.patch('/api/update-email', { email: data.email, currentPassword: data.currentPassword });
			if (res?.data?.success) {
				toast({ title: 'Email updated!' });
				form.reset();
			}
		} catch (error: any) {
			toast({ title: error.response?.data?.message || 'Error updating email', variant: 'destructive' });
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<Card className='grid gap-6 p-5 rounded-md'>
			<CardHeader>
				<h2 className='text-2xl font-semibold'>Update Email</h2>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
						<FormField
							name='email'
							control={form.control}
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input {...field} placeholder='joe@abc.com' />
										</FormControl>
										<FormMessage></FormMessage>
									</FormItem>
								);
							}}
						/>
						<FormField
							name='currentPassword'
							control={form.control}
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Current password</FormLabel>
										<FormControl>
											<Input {...field} type={'password'} placeholder='* * * * * * * *' />
										</FormControl>
										<FormMessage></FormMessage>
									</FormItem>
								);
							}}
						/>
						<Button type='submit' className='flex gap-2'>
							{isSubmitting ? (
								<>
									<span>Submitting</span>
									<span>
										<Loader2 className='w-4 animate-spin' />
									</span>
								</>
							) : (
								<>
									<span>Submit</span>
								</>
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
