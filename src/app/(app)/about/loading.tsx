import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='grid gap-10 py-16'>
			<Skeleton className='mb-10 w-64 h-16 rounded-full bg-slate-200 dark:bg-slate-800' />
			<div className='grid gap-2'>
				<Skeleton className='mb-8 w-1/2 h-8 lg:h-10 rounded-full bg-slate-200 dark:bg-slate-800' />
				<Skeleton className='w-full h-5 rounded-full bg-slate-200 dark:bg-slate-800' />
				<Skeleton className='w-full h-5 rounded-full bg-slate-200 dark:bg-slate-800' />
				<Skeleton className='w-full h-5 rounded-full bg-slate-200 dark:bg-slate-800' />
				<Skeleton className='w-1/3 h-5 rounded-full bg-slate-200 dark:bg-slate-800' />
			</div>
			<div className='grid gap-4'>
				<Skeleton className='mb-8 w-1/2 h-8 lg:h-10 rounded-full bg-slate-200 dark:bg-slate-800' />
				<div className='grid gap-4'>
					<div className='grid gap-2'>
						<Skeleton className='w-full h-5 rounded-full bg-slate-200 dark:bg-slate-800' />
						<Skeleton className='w-1/3 h-5 rounded-full bg-slate-200 dark:bg-slate-800' />
					</div>
					<div className='grid gap-2'>
						<Skeleton className='w-full h-5 rounded-full bg-slate-200 dark:bg-slate-800' />
						<Skeleton className='w-2/3 h-5 rounded-full bg-slate-200 dark:bg-slate-800' />
					</div>
					<div className='grid gap-2'>
						<Skeleton className='w-full h-5 rounded-full bg-slate-200 dark:bg-slate-800' />
						<Skeleton className='w-1/2 h-5 rounded-full bg-slate-200 dark:bg-slate-800' />
					</div>
					<div className='grid gap-2'>
						<Skeleton className='w-full h-5 rounded-full bg-slate-200 dark:bg-slate-800' />
						<Skeleton className='w-1/4 h-5 rounded-full bg-slate-200 dark:bg-slate-800' />
					</div>
				</div>
			</div>
		</div>
	);
}
