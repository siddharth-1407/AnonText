'use client';
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function StickyScroll({ scrollRef }: { scrollRef: React.RefObject<HTMLElement> }) {
	const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start', 'end'] });
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});
	return (
		<motion.div
			className='h-0.5 z-10 fixed w-full md:sticky top-16 left-0 origin-left bg-gradient-to-r from-yellow-300 via-red-500 to-blue-500'
			style={{
				scaleX: scaleX,
			}}></motion.div>
	);
}
