'use client';
import { useState } from 'react';
import SendReplyForm from './forms/auth/SendReplyForm';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog';

export default function ReplyDialog({ data }: { data: MessageCard }) {
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className='py-2 px-2 w-full text-center hover:bg-blue-500/10 dark:hover:bg-white/5 transition-colors'>Reply</DialogTrigger>
			<DialogContent>
				<DialogHeader className='pt-4'>
					<Card className='dark:bg-gray-950'>
						<CardHeader className='flex-row gap-4 py-4'>
							<Avatar>
								<AvatarImage src='' />
								<AvatarFallback>C</AvatarFallback>
							</Avatar>
							<div>
								<span className='font-semibold'>Anonymous</span>
							</div>
						</CardHeader>
						<CardContent className='ml-14 '>{data.content}</CardContent>
					</Card>
				</DialogHeader>
				<DialogDescription>
					<SendReplyForm handleClose={handleClose} messageData={data}>
						<DialogClose className='h-full w-full bg-red-500/80 rounded-md text-white font-semibold hover:opacity-85'>Close</DialogClose>
					</SendReplyForm>
				</DialogDescription>
			</DialogContent>
		</Dialog>
	);
}
