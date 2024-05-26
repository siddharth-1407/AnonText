'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import StickyScroll from '@/components/StickyScroll';
import AcceptMessagesCarousel from '@/components/AcceptMessagesCarousel';

export default function page() {
	const scrollRef = useRef<HTMLElement>(null);
	return (
		<>
			<StickyScroll scrollRef={scrollRef} />
			<main ref={scrollRef} className=' grid gap-12 py-16 md:gap-20'>
				<div className='py-16 sm:py-24 grid gap-4 sm:gap-6 place-items-center'>
					<div className='flex flex-col gap-4 sm:gap-6 md:gap-8 xl:gap-10'>
						<h1 className='text-center text-[clamp(2.5rem,10vw,3.75rem)] lg:text-[clamp(4.5rem,6vw,6.5rem)] leading-none sm:text-6xl font-extrabold'>
							Welcome to <br />
							AnonText
						</h1>
						<p className='text-center text-[clamp(1.125rem,4vw,1.25rem)] sm:text-xl lg:text-[clamp(1.25rem,6vw,1.75rem)] md:max-w-lg lg:max-w-2xl xl:max-w-3xl xl:leading-relaxed font-medium'>
							Experience a new way to communicate with friends and peers. Stay anonymous or reveal your identity
						</p>
						<Link
							className='group relative z-0 py-2 px-4 md:py-3 md:px-6 w-fit text-center sm:text-lg mx-auto rounded-md overflow-hidden after:absolute hover:after:bg-gradient-to-b from-yellow-300 via-red-500 to-blue-500 after:w-[120%] after:aspect-square 
							after:rounded-full after:-left-[10%] after:-top-[120%] after:pointer-events-none after:animate-none hover:after:animate-spin hover:after:duration-1500 transition-all '
							href={'/sign-up'}>
							<span className='absolute inset-0 lg:group-hover:inset-1 transition-all bg-black dark:bg-white rounded-sm z-10'></span>
							<span className='relative text-white dark:text-black z-20 font-bold'>Get started</span>
							<span></span>
						</Link>
					</div>
				</div>

				<motion.section
					initial={{ opacity: 0, y: 80 }}
					whileInView={{ opacity: 1, y: 0, transition: { delay: 0.5, type: 'spring', bounce: 0.4, duration: 0.8 } }}
					viewport={{ once: true }}
					className='flex flex-col md:flex-row gap-4 md:gap-0 items-center lg:h-[50vh]'>
					<h2 className='text-[clamp(1.5rem,6vw,2.5rem)] text-2xl md:hidden self-start sm:text-4xl font-medium'>Personal Dashboard</h2>
					<div className='image h-fit flex-1 shadow-2xl dark:shadow-white/10 '>
						<Image className='dark:hidden' src={'/home/small/dashboard_small-light.jpg'} width={1000} height={500} alt='' />
						<Image
							className='flex-1 hidden dark:block'
							src={'/home/small/dashboard_small-dark.jpg'}
							width={1000}
							height={500}
							quality={100}
							alt=''
						/>
					</div>
					<div className='flex-1 flex'>
						<div className='md:pl-10 lg:py-20 lg:pl-20 lg:pr-16 flex flex-col sm:gap-4 md:gap-4 lg:gap-6'>
							<h2 className='hidden md:block sm:text-4xl md:text-2xl md:font-semibold lg:text-4xl lg:font-medium 2xl:text-5xl'>
								Personal Dashboard
							</h2>
							<p className='text-[clamp(1rem,4vw,1.25rem)] sm:text-xl md:text-base md:font-medium lg:font-normal lg:text-lg 2xl:text-xl'>
								View all the messages you've received in one place, whether anonymous or not. Stay organized and in control.
							</p>
						</div>
					</div>
				</motion.section>
				<motion.section
					initial={{ opacity: 0, y: 80 }}
					whileInView={{ opacity: 1, y: 0, transition: { delay: 0.5, type: 'spring', bounce: 0.4, duration: 0.8 } }}
					viewport={{ once: true }}
					className='flex flex-col-reverse md:flex-row gap-4 md:gap-0 items-center lg:h-[50vh]'>
					<div className='flex-1 flex'>
						<div className='md:pl-4 md:pr-10 lg:py-20 lg:pl-20 lg:pr-16 flex flex-col md:gap-4 lg:gap-6'>
							<h2 className='hidden md:block md:text-2xl md:font-semibold lg:text-4xl lg:font-medium 2xl:text-5xl'>
								Manage Your Privacy
							</h2>
							<p className='text-[clamp(1rem,4vw,1.25rem)] sm:text-xl md:text-base md:font-medium lg:font-normal lg:text-lg 2xl:text-xl'>
								Easily toggle your availability to receive messages. Your profile, your rules.
							</p>
						</div>
					</div>

					<div className='image h-fit flex-1 shadow-2xl dark:shadow-white/10'>
						<AcceptMessagesCarousel />
					</div>
					<h2 className='text-[clamp(1.5rem,6vw,2.5rem)] md:hidden self-start sm:text-4xl font-medium'>Manage Your Privacy</h2>
				</motion.section>
				<motion.section
					initial={{ opacity: 0, y: 80 }}
					whileInView={{ opacity: 1, y: 0, transition: { delay: 0.5, type: 'spring', bounce: 0.4, duration: 0.8 } }}
					viewport={{ once: true }}
					className='flex flex-col md:flex-row gap-4 md:gap-0 items-center lg:h-[50vh]'>
					<h2 className='text-[clamp(1.5rem,6vw,2.5rem)] md:hidden self-start sm:text-4xl font-medium'>Track Your past messages</h2>
					<div className='image h-fit flex-1 shadow-2xl dark:shadow-white/10'>
						<Image className='dark:hidden' src={'/home/small/check_replies_small-light.jpg'} width={1000} height={500} alt='' />
						<Image
							className='flex-1 hidden dark:block'
							src={'/home/small/check_replies_small-dark.jpg'}
							width={1000}
							height={500}
							alt=''
						/>
					</div>
					<div className='flex-1 flex'>
						<div className='md:pl-10 lg:py-20 lg:pl-20 lg:pr-16 flex flex-col md:gap-4 lg:gap-6'>
							<h2 className='hidden md:block md:text-2xl md:font-semibold lg:text-4xl lg:font-medium 2xl:text-5xl'>
								Track Your past messages
							</h2>
							<p className='text-[clamp(1rem,4vw,1.25rem)] sm:text-xl md:text-base md:font-medium lg:font-normal lg:text-lg 2xl:text-xl'>
								Review your past messages and see replies. Never lose track of your anonymous conversations.
							</p>
						</div>
					</div>
				</motion.section>
			</main>
		</>
	);
}
