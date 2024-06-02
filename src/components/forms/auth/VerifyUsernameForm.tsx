'use client';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import verifySchema from '@/Schemas/verify.schema';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usernameValidation } from '@/Schemas/signup.schema';
import { useParams, useRouter } from 'next/navigation';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import axios from 'axios';

const verifyCodeSchema = z.object({
	username: usernameValidation,
	verifyCode: verifySchema,
});

export default function VerifyUsernameForm(): React.JSX.Element {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [resentCode, setResentCode] = useState(false);
	const [counter, setCounter] = useState(0);
	const router = useRouter();
	const params = useParams<{ username: string }>();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof verifyCodeSchema>>({
		defaultValues: {
			username: params.username,
			verifyCode: '',
		},
		resolver: zodResolver(verifyCodeSchema),
	});

	const onSubmit: SubmitHandler<z.infer<typeof verifyCodeSchema>> = async (data: z.infer<typeof verifyCodeSchema>) => {
		try {
			setIsSubmitting(true);
			const res = await fetch('/api/verify-code', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username: data.username, verifyCode: data.verifyCode }),
			});
			const _data = await res.json();
			if (_data.success) {
				toast({ description: 'Verification finished!' });
				router.replace('/sign-in');
			} else {
				toast({ description: _data?.message, variant: 'destructive' });
				form.setError('verifyCode', { message: _data?.message || 'Verification failed!' });
			}
		} catch (error) {
			toast({ description: 'Verification Failed!', variant: 'destructive' });
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		counter > 0 && setTimeout(() => setCounter((prev) => prev - 1), 1000);
	}, [counter]);
	const resentVerifyCode = useCallback(async () => {
		setResentCode(true);
		try {
			const res = await axios.patch('/api/renew-verify-code', { username: params.username });
			if (!res?.data?.success) {
				toast({ title: res.data?.message || 'Error sending verify code' });
			}
			setCounter(60);
			toast({ title: 'Sent: Please check your email!' });
		} catch (error) {
			toast({ title: 'Error sending resend code' });
		} finally {
			setResentCode(false);
		}
	}, []);
	return (
		<div className='m-auto max-w-md w-full p-8 space-y-8 rounded-lg shadow-xs shadow-gray-300 dark:shadow-gray-800'>
			<h1 className='text-4xl font-extrabold text-center dark:text-white'>Verify your account</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
					<FormField
						name='verifyCode'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Verification Code</FormLabel>
								<FormControl>
									<Input placeholder='verify code' {...field} />
								</FormControl>
								<FormDescription>Check your email</FormDescription>
								<FormMessage></FormMessage>
							</FormItem>
						)}
					/>

					<Button type='submit' className='flex gap-2'>
						{isSubmitting ? (
							<>
								<span>Verifying</span>
								<Loader2 className='animate-spin w-5' />
							</>
						) : (
							<span>Verify</span>
						)}
					</Button>
					<button
						disabled={resentCode || Boolean(counter)}
						onClick={resentVerifyCode}
						className='w-full text-center text-sm hover:underline disabled:no-underline disabled:cursor-not-allowed disabled:text-white/50'>
						Didn&apos;t receive the code? Resent!&nbsp;
						{Boolean(counter) && <span className='text-sm  text-center'>Try again in {counter} seconds</span>}
					</button>
				</form>
			</Form>
		</div>
	);
}
