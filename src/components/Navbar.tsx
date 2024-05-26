import React from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/[...nextauth]/options';
import { getUserData } from '@/helpers/GetData';
import NavbarResponsive from './NavbarResponsive';

import NavbarDesktop from './NavBarDesktop';

export default async function Navbar(): Promise<React.JSX.Element> {
	const session = await getServerSession(authOptions);
	const userData: UserProfileData | boolean | null = session && session?.user && (await getUserData(session?.user?.username!));

	return (
		<div className='z-10 sticky top-0 py-3 backdrop-blur-sm'>
			<NavbarDesktop serverSession={session} serverUserData={userData} />
			<NavbarResponsive session={session} />
		</div>
	);
}
