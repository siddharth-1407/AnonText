'use client';
import { z } from 'zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import UpdateProfileSchema from '@/Schemas/UpdateProfileSchema';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation';

async function uploadImageToLocalDir(file: File) {
	if (!file) {
		console.log('No file provided');
		return { success: false, message: 'no file provided' };
	}
	try {
		const formData = new FormData();
		formData.set('file', file);
		const res = await axios.post('/api/upload', formData);
		return res.data;
	} catch (error) {
		console.log(error);
	}
}
export default function UpdateProfile({ userData }: { userData: any }) {
	const { toast } = useToast();
	const router = useRouter();
	const [avatar, setAvatar] = useState<string>(userData?.avatar?.url);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const form = useForm<z.infer<typeof UpdateProfileSchema>>({
		resolver: zodResolver(UpdateProfileSchema),
	});
	const avatarRef = form.register('avatar');

	const onSubmit: SubmitHandler<z.infer<typeof UpdateProfileSchema>> = async (data: z.infer<typeof UpdateProfileSchema>) => {
		setIsSubmitting(true);
		try {
			let uploadImage;
			if (data.avatar?.length) {
				uploadImage = await uploadImageToLocalDir(data.avatar?.[0]);
				if (!uploadImage?.success) {
					toast({ title: 'Error updating profile', variant: 'destructive' });
				}
			}
			const res = await axios.patch('/api/update-profile', { avatar: uploadImage?.localPath || '', status: data.status });
			if (res?.data?.success) {
				router.refresh();
				toast({ title: 'Profile updated!' });
			}
		} catch (error: any) {
			toast({ title: error?.response?.data?.message || 'Error updating profile', variant: 'destructive' });
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Card className='grid gap-6 p-5 rounded-md'>
			<CardHeader>
				<h2 className='text-2xl font-semibold'>Update Profile</h2>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
						<FormField
							name='avatar'
							control={form.control}
							render={({ field }) => (
								<FormItem className='group grid gap-4'>
									<FormLabel htmlFor='avatar' className='mx-auto rounded-full grid gap-4 '>
										<Avatar className='mx-auto cursor-pointer w-24 h-24 md:w-28 md:h-28 xl:w-40 xl:h-40 relative after:absolute ring-4 after:inset-0 hover:after:bg-black/20  group-focus-within:after:bg-black/20 group-focus-within:outline transition-colors'>
											<AvatarImage src={avatar?.toString()} className='object-cover' />
											<AvatarFallback className='sm:text-5xl text-7xl'>{userData?.username.slice(0, 1)}</AvatarFallback>
										</Avatar>
									</FormLabel>
									<FormControl>
										<Input
											id='avatar'
											type='file'
											className='w-0 p-0 h-0 overflow-hidden border-0 focus:ring-0 group-focus-within:ring-0'
											{...avatarRef}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
												setAvatar(URL.createObjectURL(e?.target?.files?.[0] as Blob));
												return field.onChange(e.target?.files?.[0] ?? undefined);
											}}
										/>
									</FormControl>
									<FormMessage></FormMessage>
								</FormItem>
							)}
						/>
						<FormField
							name='status'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<FormControl>
										<Input {...field} autoComplete='off' placeholder={userData?.about || 'I love cats!'} />
									</FormControl>
									<FormMessage></FormMessage>
								</FormItem>
							)}
						/>
						<Button type='submit' disabled={isSubmitting} className='flex gap-2'>
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
