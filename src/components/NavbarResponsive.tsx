'use client';
import Link from 'next/link';
import { Session } from 'next-auth';
import { Button } from './ui/button';
import ToggleTheme from './ToggleTheme';
import { PTSans } from './NavBarDesktop';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { AlignJustify, Home, LayoutDashboard, Library, LogOut, Settings2, User } from 'lucide-react';

const navLinksResponsive = [
	{
		id: 1,
		title: 'Home',
		path: '/',
		onAuth: false,
		icon: <Home className='w-4' />,
	},
	{
		id: 2,
		title: 'Dashboard',
		path: '/dashboard',
		onAuth: true,
		icon: <LayoutDashboard className='w-4' />,
	},
	{
		id: 3,
		title: 'About',
		path: '/about',
		onAuth: false,
		icon: <Library className='w-4' />,
	},
];

export default function NavbarResponsive({ session }: { session: Session | null }) {
	const router = useRouter();
	return (
		<div className='container max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl mx-auto backdrop-blur-sm flex md:hidden justify-between items-center'>
			<div className='flex gap-4'>
				<Sheet>
					<SheetTrigger asChild>
						<Button className='aspect-square px-0' variant='outline'>
							<AlignJustify />
						</Button>
					</SheetTrigger>
					<SheetContent side={'left'}>
						<SheetHeader>
							<Link
								href={'/'}
								className={`grid place-items-center font-bold text-xl px-4 py-1 rounded-lg bg-blue-700/20 dark:bg-blue-500 ${PTSans}`}>
								AnonText
							</Link>
						</SheetHeader>
						<nav className='py-4 h-full flex flex-col justify-between'>
							<ul className='grid gap-4'>
								{navLinksResponsive.map((link) => {
									const handleClick = () => {
										router.push(link.path);
									};
									if (!session?.user && !link.onAuth) {
										return (
											<li key={link.id}>
												<SheetClose asChild>
													<Button className='w-full flex gap-3 justify-start' onClick={handleClick}>
														<span>{link.icon}</span>
														<span>{link.title}</span>
													</Button>
												</SheetClose>
											</li>
										);
									} else if (session?.user) {
										return (
											<li key={link.id}>
												<SheetClose asChild>
													<Button className='w-full flex gap-3 justify-start' onClick={handleClick}>
														<span>{link.icon}</span>
														<span>{link.title}</span>
													</Button>
												</SheetClose>
											</li>
										);
									}
								})}
							</ul>
							{session && session?.user && (
								<ul className='grid gap-4'>
									<li>
										<SheetClose asChild>
											<Button
												className='w-full flex gap-3 justify-start'
												onClick={() => router.push(`/p/${session?.user.username}`)}>
												<span>
													<User className='w-4' />
												</span>
												<span>Profile</span>
											</Button>
										</SheetClose>
									</li>
									<li>
										<SheetClose asChild>
											<Button className='w-full flex gap-3 justify-start' onClick={() => router.push(`/settings`)}>
												<span>
													<Settings2 className='w-4' />
												</span>
												<span>Settings</span>
											</Button>
										</SheetClose>
									</li>
									<li>
										<SheetClose asChild>
											<Button
												className='w-full bg-red-500/60 hover:bg-red-500/50 text-white font-medium flex gap-3 justify-start'
												onClick={() => signOut()}>
												<span>
													<LogOut className='w-4' />
												</span>
												<span className='-translate-y-0.5'>Logout</span>
											</Button>
										</SheetClose>
									</li>
								</ul>
							)}
						</nav>
					</SheetContent>
				</Sheet>
			</div>
			<div className='flex gap-6'>
				<ToggleTheme />
			</div>
		</div>
	);
}
