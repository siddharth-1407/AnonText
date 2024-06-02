import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='mt-6 grid gap-4'>
			<div className='py-8 md:pt-8 w-full flex flex-col md:flex-row gap-6 md:gap-12'>
				<div className='mx-auto md:mx-0 aspect-square w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full grid place-items-center ring'>
					<Skeleton className='w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full bg-slate-200 dark:bg-slate-800' />
				</div>
				<div className='w-full flex flex-col justify-between gap-4 xs:gap-6'>
					<div className='grid gap-4'>
						<Skeleton className='w-36 h-8 rounded-full bg-slate-200 dark:bg-slate-800' />
						<Skeleton className='w-1/2 h-5 rounded-full bg-slate-200 dark:bg-slate-800' />
					</div>
					<div className='flex flex-col xs:flex-row gap-4 md:gap-6'>
						<Card className='dark:bg-gray-950 flex-1 max-w-sm shadow-sm'>
							<CardHeader className='flex flex-row items-end gap-2'>
								<Skeleton className='w-56 h-4 rounded-full bg-slate-200 dark:bg-slate-800' />
							</CardHeader>
						</Card>
					</div>
				</div>
			</div>
			<Separator />
		</div>
	);
}
