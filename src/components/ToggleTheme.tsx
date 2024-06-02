'use client';
import React from 'react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { Check, Moon, Sun } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function ToggleTheme() {
	const { theme, setTheme } = useTheme();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className='dark:bg-gray-950'>
				<Button variant='outline' size='icon'>
					<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='dark:bg-gray-950'>
				<DropdownMenuItem
					className={`${theme === 'light' && 'bg-green-500/25'} flex justify-between items-center`}
					onClick={() => setTheme('light')}>
					<span>Light</span>
					{theme === 'light' && <Check className='w-4' />}
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className={`${theme === 'dark' && 'bg-green-400/25'} flex justify-between items-center`}
					onClick={() => setTheme('dark')}>
					<span>Dark</span>
					{theme === 'dark' && <Check className='w-4' />}
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className={`${theme === 'system' && 'bg-green-400/25'} flex justify-between items-center`}
					onClick={() => setTheme('system')}>
					<span>System</span>
					{theme === 'system' && <Check className='w-4' />}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
