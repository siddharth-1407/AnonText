import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export { default } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET, cookieName: '__Secure-next-auth.session-token' });
	const url = request.nextUrl;

	if (token && (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up' || url.pathname.startsWith('/verify')))) {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}
	console.log(!token);
	if (!token && (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/settings/'))) {
		return NextResponse.redirect(new URL('/sign-in', request.url));
	}
}

export const config = {
	matcher: ['/sign-in', '/sign-up', '/verify/:path*', '/', '/dashboard', '/settings/:path*'],
};
