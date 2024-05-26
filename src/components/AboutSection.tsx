export default function AboutSection({ data }: { data: AboutSection }) {
	return (
		<section className='grid gap-4 lg:gap-6'>
			<h2 className='text-xl sm:text-3xl lg:text-4xl font-semibold'>{data?.heading}</h2>
			{data?.text && <p className='sm:text-lg'>{data?.text}</p>}
			{data?.points && (
				<div className='grid gap-4'>
					{data.points?.map((item, i) => {
						return (
							<div key={item.id} className='flex-inline pl-4 '>
								<span className='font-extrabold sm:text-xl'>{i + 1}. </span>
								<h3 className='font-semibold inline sm:text-xl'>{item.title} : </h3>
								<p className=' inline sm:text-lg'>{item.content}</p>
							</div>
						);
					})}
				</div>
			)}
		</section>
	);
}
