import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='grid gap-12 py-16'>
			<div className='py-16 sm:py-24 grid gap-4 sm:gap-6 place-items-center'>
				<div className='w-full flex flex-col gap-4 sm:gap-6 md:gap-8 xl:gap-10'>
					<div>
						<Skeleton className='mx-auto mb-2 w-72 md:w-80 h-12 lg:h-16 rounded-full bg-slate-200 dark:bg-slate-800' />
						<Skeleton className='mx-auto mb-2 w-56 h-12 lg:h-16 rounded-full bg-slate-200 dark:bg-slate-800' />
					</div>
					<div className='w-full'>
						<Skeleton className='mx-auto mb-4 w-full max-w-lg lg:max-w-2xl xl:max-w-3xl h-4 lg:h-6 rounded-full bg-slate-200 dark:bg-slate-800' />
						<Skeleton className='mx-auto mb-4 w-full lg:w-3/4 max-w-lg lg:max-w-2xl xl:max-w-3xl h-4 lg:h-6 rounded-full bg-slate-200 dark:bg-slate-800' />
						<Skeleton className='mx-auto mb-4 w-full lg:w-1/3 xl:hidden max-w-lg lg:max-w-2xl xl:max-w-3xl h-4 lg:h-6 rounded-full bg-slate-200 dark:bg-slate-800' />
					</div>
					<Skeleton className='mx-auto mb-2 w-44 h-14 rounded-md bg-slate-200 dark:bg-slate-800' />
				</div>
			</div>
			<div className='flex flex-col md:flex-row gap-4 md:gap-0 md:items-center lg:h-[50vh]'>
				<Skeleton className='md:hidden w-2/3 h-10 rounded-full bg-slate-200 dark:bg-slate-800' />

				<div className='flex-1 shadow-2xl'>
					<Skeleton className='w-full aspect-video rounded-md bg-slate-200 dark:bg-slate-800' />
				</div>
				<div className='flex-1 flex'>
					<div className='w-full md:pl-10 lg:py-20 lg:pl-20 lg:pr-16 flex flex-col sm:gap-4 md:gap-4 lg:gap-6'>
						<Skeleton className='hidden md:block w-full h-10 rounded-full bg-slate-200 dark:bg-slate-800' />
						<div className='grid gap-2'>
							<Skeleton className='w-full h-5 rounded-full bg-slate-200 dark:bg-slate-800' />
							<Skeleton className='w-full h-5 rounded-full bg-slate-200 dark:bg-slate-800' />
							<Skeleton className='w-1/2 h-5 rounded-full bg-slate-200 dark:bg-slate-800' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
