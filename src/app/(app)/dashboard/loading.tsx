import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='mt-10 grid gap-4'>
			<Card>
				<CardHeader>
					<Skeleton className='mb-8 w-1/3 h-6 lg:h-8 rounded-full bg-slate-200 dark:bg-slate-800' />
					<CardContent className='p-0 flex justify-between items-center'>
						<Skeleton className='w-[30%] h-5 rounded-full bg-slate-200 dark:bg-slate-800' />
						<Skeleton className='w-20 h-10 rounded bg-slate-200 dark:bg-slate-800' />
					</CardContent>
				</CardHeader>
			</Card>
			<div className='grid gap-2'>
				<Skeleton className='w-14 h-8 rounded-full bg-slate-200 dark:bg-slate-800' />
				<Skeleton className='w-32 h-4 rounded-full bg-slate-200 dark:bg-slate-800' />
			</div>

			<div className='grid gap-4 pt-6'>
				<Card className='dark:bg-gray-950'>
					<CardHeader className='flex-row gap-4 py-4'>
						<>
							<Skeleton className='w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800' />
							<Skeleton className='w-32 h-4 rounded-full bg-slate-200 dark:bg-slate-800' />
						</>
					</CardHeader>
					<CardContent className='ml-14'>
						<Skeleton className='w-1/2 h-4 rounded-full bg-slate-200 dark:bg-slate-800' />
					</CardContent>
				</Card>
				<Card className='dark:bg-gray-950'>
					<CardHeader className='flex-row gap-4 py-4'>
						<>
							<Skeleton className='w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800' />
							<Skeleton className='w-32 h-4 rounded-full bg-slate-200 dark:bg-slate-800' />
						</>
					</CardHeader>
					<CardContent className='ml-14'>
						<Skeleton className='w-1/2 h-4 rounded-full bg-slate-200 dark:bg-slate-800' />
					</CardContent>
				</Card>
				<Card className='dark:bg-gray-950'>
					<CardHeader className='flex-row gap-4 py-4'>
						<>
							<Skeleton className='w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800' />
							<Skeleton className='w-32 h-4 rounded-full bg-slate-200 dark:bg-slate-800' />
						</>
					</CardHeader>
					<CardContent className='ml-14'>
						<Skeleton className='w-1/2 h-4 rounded-full bg-slate-200 dark:bg-slate-800' />
					</CardContent>
				</Card>
				<Card className='dark:bg-gray-950'>
					<CardHeader className='flex-row gap-4 py-4'>
						<>
							<Skeleton className='w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800' />
							<Skeleton className='w-32 h-4 rounded-full bg-slate-200 dark:bg-slate-800' />
						</>
					</CardHeader>
					<CardContent className='ml-14'>
						<Skeleton className='w-1/2 h-4 rounded-full bg-slate-200 dark:bg-slate-800' />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
