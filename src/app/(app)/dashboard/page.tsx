import Messages from '@/components/Messages';
import { getMessages } from '@/helpers/GetData';
import ShareProfileLink from '@/components/ShareProfileLink';
import ToggleIsAcceptingMessages from '@/components/forms/auth/ToggleIsAcceptingMessagesForm';
import { Metadata } from 'next';


export const revalidate = 0;


export const metadata: Metadata = {
	title: 'Dashboard',
	description:
		'AnonText is a secure and anonymous messaging platform that allows you to send and receive private messages without revealing your identity.',
	keywords: 'anonymous messaging, private messaging, secure chat, secret messages, hidden messages, anon chat, private conversations',
	applicationName: 'AnonText',
};

export default async function page() {
	const data = await getMessages();
	return (
		<div className='grid grid-cols-1 gap-4 pt-10'>
			<ShareProfileLink />
			<ToggleIsAcceptingMessages />
			<Messages data={data} />
		</div>
	);
}
