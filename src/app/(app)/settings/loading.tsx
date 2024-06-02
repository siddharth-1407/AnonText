import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function loading() {
	return (
		<div className='col-span-5'>
			<Skeleton className='mb-8 w-44 h-10 rounded-full bg-slate-200 dark:bg-slate-800' />
			<div className='grid gap-0.5'>
				<Skeleton className='w-full h-10 rounded-lg bg-slate-200 dark:bg-slate-800' />
				<Separator />
				<Skeleton className='w-full h-10 rounded-lg bg-slate-200 dark:bg-slate-800' />
			</div>
		</div>
	);
}
