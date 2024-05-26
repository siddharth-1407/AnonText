import * as z from 'zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReplySchema from '@/Schemas/reply.schema';
import { toast } from '@/components/ui/use-toast';
import React, { ReactNode, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation';

export default function SendReplyForm({ messageData, handleClose, children }: SendReplyFormProps) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const form = useForm({
		defaultValues: {
			id: messageData._id,
			reply: '',
		},
		resolver: zodResolver(ReplySchema),
	});

	const onSubmit: SubmitHandler<z.infer<typeof ReplySchema>> = async (data: z.infer<typeof ReplySchema>) => {
		setIsSubmitting(true);
		try {
			const res = await axios.post('/api/send-reply', { id: data?.id, content: data?.reply });
			toast({ title: 'Reply sent!' });
			handleClose();
			router.refresh();
		} catch (error) {
			console.error('error sending reply');
			toast({ title: 'Error sending reply', variant: 'destructive' });
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
				<FormField
					name='reply'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Reply</FormLabel>
							<FormControl>
								<Textarea rows={8} autoCorrect='off' className='resize-none' placeholder={'Post your reply'} {...field} />
							</FormControl>
							<FormMessage></FormMessage>
						</FormItem>
					)}
				/>
				<div className='flex gap-4 w-full '>
					<div className='flex-1'>{children}</div>
					<div className='flex-1'>
						<Button className='w-full flex gap-2' disabled={isSubmitting}>
							{isSubmitting ? (
								<>
									<span>Replying</span>
									<span>
										<Loader2 className='w-4 animate-spin' />
									</span>
								</>
							) : (
								<span>Reply</span>
							)}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
