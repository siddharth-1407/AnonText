import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function loading() {
	return (
		<div className='col-span-4 w-full grid gap-1 dark:bg-white/5 p-1 rounded-md'>
			<Card className='grid gap-6 p-5 rounded-md'>
				<CardHeader>
					<Skeleton className='w-48 h-8 rounded-full bg-slate-200 dark:bg-slate-800' />
				</CardHeader>
				<CardContent className='grid gap-12'>
					<div className='grid gap-4'>
						<div className='grid gap-3'>
							<Skeleton className='w-28 h-4 rounded-full bg-slate-200 dark:bg-slate-800' />
							<Skeleton className='w-full h-10 border dark:border-slate-600/90 rounded-sm bg-slate-200 dark:bg-slate-800' />
						</div>
						<div className='grid gap-3'>
							<Skeleton className='w-40 h-4 rounded-full bg-slate-200 dark:bg-slate-800' />
							<Skeleton className='w-full h-10 border dark:border-slate-600/90 rounded-sm bg-slate-200 dark:bg-slate-800' />
						</div>
						<Skeleton className='w-full h-10 rounded-sm bg-slate-200 dark:bg-slate-800' />
					</div>
				</CardContent>
			</Card>
			<Card className='grid gap-6 p-5 rounded-md'>
				<CardHeader>
					<Skeleton className='w-48 h-8 rounded-full bg-slate-200 dark:bg-slate-800' />
				</CardHeader>
				<CardContent className='grid gap-12'>
					<div className='grid gap-4'>
						<div className='grid gap-3'>
							<Skeleton className='w-28 h-4 rounded-full bg-slate-200 dark:bg-slate-800' />
							<Skeleton className='w-full h-10 border dark:border-slate-600/90 rounded-sm bg-slate-200 dark:bg-slate-800' />
						</div>
						<div className='grid gap-3'>
							<Skeleton className='w-40 h-4 rounded-full bg-slate-200 dark:bg-slate-800' />
							<Skeleton className='w-full h-10 border dark:border-slate-600/90 rounded-sm bg-slate-200 dark:bg-slate-800' />
						</div>
						<div className='grid gap-3'>
							<Skeleton className='w-48 h-4 rounded-full bg-slate-200 dark:bg-slate-800' />
							<Skeleton className='w-full h-10 border dark:border-slate-600/90 rounded-sm bg-slate-200 dark:bg-slate-800' />
						</div>
						<Skeleton className='w-full h-10 rounded-sm bg-slate-200 dark:bg-slate-800' />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
