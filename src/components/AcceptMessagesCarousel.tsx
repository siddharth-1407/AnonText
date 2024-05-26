import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

export default function AcceptMessagesCarousel() {
	return (
		<Carousel
			plugins={[
				Autoplay({
					delay: 2000,
				}),
			]}
			opts={{
				align: 'center',
				loop: true,
			}}>
			<CarouselContent>
				<CarouselItem>
					<Image
						className='w-full dark:hidden'
						src={'/home/small/profile_is_accepting_messages_small-light.jpg'}
						width={1000}
						height={500}
						alt=''
					/>
					<Image
						className='flex-1 w-full hidden dark:block'
						src={'/home/small/profile_is_accepting_messages_small-dark.jpg'}
						width={1000}
						height={500}
						alt=''
					/>
				</CarouselItem>
				<CarouselItem>
					<Image
						className='w-full dark:hidden'
						src={'/home/small/profile_not_accepting_messages_small-dark.jpg'}
						width={1000}
						height={500}
						alt=''
					/>
					<Image
						className='flex-1 w-full hidden dark:block'
						src={'/home/small/profile_not_accepting_messages_small-light.jpg'}
						width={1000}
						height={500}
						alt=''
					/>
				</CarouselItem>
			</CarouselContent>
		</Carousel>
	);
}
