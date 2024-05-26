'use client';
import * as z from 'zod';
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '@/Schemas/signin.schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

export default function SignInForm(): React.JSX.Element {
	const router = useRouter();
	const [show, setShow] = useState<boolean>(false);
	const session = useSession();
	const { toast } = useToast();
	useEffect(() => {
		if (session.data && session.status == 'authenticated') {
			router.replace('/dashboard');
		}
	}, [session]);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof signInSchema>>({
		defaultValues: {
			identifier: '',
			password: '',
		},
		resolver: zodResolver(signInSchema),
	});

	const onSubmit: SubmitHandler<z.infer<typeof signInSchema>> = async (data: z.infer<typeof signInSchema>) => {
		try {
			setIsSubmitting(true);
			if ([data.identifier, data.password].some((item) => !item)) {
				if (!data.identifier) form.setError('identifier', { message: '', type: 'required' });
				if (!data.password) form.setError('password', { message: '', type: 'required' });
				form.setError('root', { message: 'Credentials not provided', type: 'required' });
				return;
			}
			const res = await signIn('credentials', {
				redirect: false,
				identifier: data.identifier,
				password: data.password,
			});
			if (res?.error) {
				const error: { message: string; status: boolean; issue?: string } = JSON.parse(res.error);
				if (error?.issue == 'verification') {
					form.setError('root', { message: error.message });
				} else {
					form.setError('password', { message: error.message, type: '' });
				}
				return;
			}
			toast({ description: 'Welcome' });
		} catch (error) {
			toast({ title: 'Ohh no! We could not sign you in', variant: 'destructive' });
			console.error('Error logging in: ', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='w-full max-w-lg p-8 bg-white dark:bg-gray-950 shadow-md dark:shadow-gray-800/25 rounded-lg  flex flex-col gap-12 '>
			<h1 className='text-3xl sm:text-4xl font-extrabold text-center'> Good to see you again </h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
					<FormField
						name='identifier'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username or Email</FormLabel>
								<FormControl>
									<Input
										placeholder='username or email'
										{...field}
										onChange={(e) => {
											field.onChange(e);
											form.clearErrors('root');
										}}
									/>
								</FormControl>
								<FormMessage></FormMessage>
							</FormItem>
						)}
					/>
					<FormField
						name='password'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<div className='flex gap-2'>
									<FormControl>
										<Input
											type={show ? 'text' : 'password'}
											placeholder='* * * * * * *'
											{...field}
											onChange={(e) => {
												field.onChange(e);
												form.clearErrors('root');
											}}
										/>
									</FormControl>

									<Button type='button' onClick={() => setShow((prev) => !prev)} className=''>
										{show ? <Eye className='w-4 aspect-square ' /> : <EyeOff className='w-4 aspect-square' />}
									</Button>
								</div>
								{/* <Link href='/forgot-password' className='block text-end hover:underline'>
									Forgot password?
								</Link> */}

								<FormMessage></FormMessage>
							</FormItem>
						)}
					/>
					<FormMessage>{form.formState?.errors?.root?.message}</FormMessage>
					<Button className='flex gap-2'>
						{isSubmitting ? (
							<>
								<span>Logging in</span>
								<Loader2 className='animate-spin w-5' />
							</>
						) : (
							<span>Login</span>
						)}
					</Button>
					<p className='py-2 text-center'>
						Don't have an account?{' '}
						<Link className='font-medium hover:underline' href={'/sign-up'}>
							Sign up
						</Link>
					</p>
				</form>
			</Form>
		</div>
	);
}
