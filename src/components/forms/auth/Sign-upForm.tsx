'use client';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema } from '@/Schemas/signup.schema';
import useDebounceValue from '@/hooks/useDebounceValue';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Button } from '../../ui/button';
import { ApiResponse } from '@/types/ApiResponse';
import { Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';

export default function SignUpForm(): JSX.Element {
	const [username, setUsername] = useState('');
	const [loadingUsername, setLoadingUsername] = useState(false);
	const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
	const deboundedUsername = useDebounceValue(username);
	const { toast } = useToast();
	useEffect(() => {
		const checkUniqueUsername = async (username: string) => {
			setLoadingUsername(true);
			try {
				const res = await axios.get(`/api/check-unique-username?username=${username}`);
				if (!res?.data?.success) {
					form.setError('username', { message: 'Username is already taken' });
					setIsUsernameAvailable(false);
				} else {
					form.clearErrors('username');
					setIsUsernameAvailable(true);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoadingUsername(false);
			}
		};
		if (deboundedUsername) {
			checkUniqueUsername(deboundedUsername);
		}
	}, [deboundedUsername]);

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const form = useForm<z.infer<typeof SignupSchema>>({
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
		resolver: zodResolver(SignupSchema),
	});
	const router = useRouter();

	const onSubmit: SubmitHandler<z.infer<typeof SignupSchema>> = async (data: z.infer<typeof SignupSchema>) => {
		try {
			setIsSubmitting(true);
			const res = await fetch('/api/sign-up', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const _data: ApiResponse = await res.json();
			if (_data.success) {
				router.replace(`/verify/${data.username}`);
			} else {
				toast({ title: _data.message, variant: 'destructive' });
			}
		} catch (error) {
			console.error('Error while verifying code: ', error);
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<div className='w-full max-w-lg p-8 bg-white dark:bg-gray-950 shadow-md dark:shadow-gray-800/25 rounded-lg flex flex-col gap-12 '>
			<h1 className='text-3xl sm:text-5xl font-extrabold text-center'>
				Welcome
				<span className='text-xl sm:text-xl block'>Join us today</span>
			</h1>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
					<FormField
						name='username'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										placeholder='joe_123'
										autoCorrect='off'
										autoComplete='off'
										{...field}
										onChange={(e) => {
											field.onChange(e);
											setUsername(e.target.value);
										}}
									/>
								</FormControl>

								<FormDescription className='flex gap-2 items-center'>
									{loadingUsername ? (
										<Loader2 className='w-4 animate-spin' />
									) : (
										isUsernameAvailable && (
											<>
												<Check className='w-4 text-green-400' />
												<span>Username is available!</span>
											</>
										)
									)}
								</FormDescription>

								<FormMessage className='flex gap-2 text-red-500 font-medium'></FormMessage>
							</FormItem>
						)}
					/>
					<FormField
						name='email'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type='email' placeholder='joe@abc.com' {...field} />
								</FormControl>
								<FormMessage className='text-red-500 font-medium'></FormMessage>
							</FormItem>
						)}
					/>
					<FormField
						name='password'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type='password' placeholder='* * * * * * * *' {...field} />
								</FormControl>
								<FormMessage className='text-red-500 font-medium'></FormMessage>
							</FormItem>
						)}
					/>
					<Button className='flex gap-2'>
						{isSubmitting ? (
							<>
								<span>Submitting</span>
								<Loader2 className='w-5 animate-spin' />
							</>
						) : (
							<span>Submit</span>
						)}
					</Button>
					<p className='py-2 text-center'>
						Already have an account?{' '}
						<Link className='font-medium hover:underline' href={'/sign-in'}>
							Sign in
						</Link>
					</p>
				</form>
			</Form>
		</div>
	);
}
