import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User.model';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				identifier: { label: 'Identifier', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials: any): Promise<any> {
				await dbConnect();
				try {
					const user = await UserModel.findOne({
						$or: [{ email: credentials.identifier }, { username: credentials.identifier }],
					});
					if (!user) {
						throw new Error(JSON.stringify({ message: 'Incorrect credentials', status: false }));
					}
					if (!user.isVerified) {
						throw new Error(JSON.stringify({ message: 'Please verify your account first', status: false, issue:'verification' }));
					}
					const isPasswordCorrect = await user.isPasswordCorrect(credentials.password);

					if (isPasswordCorrect) {
						return user;
					} else {
						throw new Error(JSON.stringify({ message: 'Incorrect Password', status: false }));
					}
				} catch (error: any) {
				
					throw new Error(error.message);
				}
			},
		}),
	],
	pages: {
		signIn: '/sign-in',
	},
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
	useSecureCookies: true,
	callbacks: {
		async session({ session, token }) {
			if (token) {
				session.user._id = token._id;
				session.user.username = token.username;
				session.user.isVerified = token.isVerified;
				session.user.isAcceptingMessages = token.isAcceptingMessages;
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.username = user.username;
				token._id = user._id?.toString();
				token.isVerified = user.isVerified;
				token.isAcceptingMessages = user.isAcceptingMessages;
			}
			return token;
		},
	},
};

export default authOptions;
