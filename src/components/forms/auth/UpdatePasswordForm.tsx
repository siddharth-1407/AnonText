'use client';
import { z } from 'zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import ChangePasswordSchema from '@/Schemas/ChangePasswordSchema';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export default function UpdatePasswordForm() {
	const { toast } = useToast();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const form = useForm<z.infer<typeof ChangePasswordSchema>>({
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
		resolver: zodResolver(ChangePasswordSchema),
	});
	const onSubmit: SubmitHandler<z.infer<typeof ChangePasswordSchema>> = async (data: z.infer<typeof ChangePasswordSchema>) => {
		setIsSubmitting(true);
		try {
			const res = await axios.patch('/api/update-password', {
				currentPassword: data.currentPassword,
				newPassword: data.newPassword,
				confirmPassword: data.confirmPassword,
			});
			if (res?.data?.success) {
				toast({ title: 'Password updated! Please login again.' });
				signOut();
			}
		} catch (error: any) {
			console.log('Error updating password: ', error);
			toast({ title: error?.response?.data?.message || 'Error updating password', variant: 'destructive' });
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<Card className='grid gap-6 p-5 rounded-md'>
			<CardHeader>
				<h2 className='text-2xl font-semibold'>Update Password</h2>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
						<FormField
							name='currentPassword'
							control={form.control}
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Current password</FormLabel>
										<FormControl>
											<Input type='password' {...field} placeholder='* * * * * * * *' />
										</FormControl>
										<FormMessage></FormMessage>
									</FormItem>
								);
							}}
						/>
						<FormField
							name='newPassword'
							control={form.control}
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>New password</FormLabel>
										<FormControl>
											<Input {...field} type={'password'} placeholder='* * * * * * * *' />
										</FormControl>
										<FormMessage></FormMessage>
									</FormItem>
								);
							}}
						/>
						<FormField
							name='confirmPassword'
							control={form.control}
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Confirm password</FormLabel>
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
									<span>Updating</span>
									<span>
										<Loader2 className='w-4 animate-spin' />
									</span>
								</>
							) : (
								<>
									<span>Update</span>
								</>
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
