import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface WrapperProps extends React.HTMLProps<HTMLDivElement> {
	children: ReactNode;
}
export default function Wrapper({ children, className }: WrapperProps) {
	return (
		<div className={cn('flex-1 flex flex-col min-h-screen container max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl mx-auto', className)}>
			{children}
		</div>
	);
}
