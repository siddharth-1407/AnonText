import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User.model';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';

type Credentials = Record<'identifier' | 'password', string> | undefined;
const credentialsValidator = z.object({
	identifier: z.string({ message: 'This fiend is required (identifier)' }),
	password: z.string({ message: 'This field is required (password)' }),
});
const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				identifier: { label: 'Identifier', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials: Credentials): Promise<any> {
				await dbConnect();
				try {
					const result = credentialsValidator.safeParse(credentials);
					if (!result.success) {
						const errors = result.error?.format()?._errors?.join(',');
						throw new Error(JSON.stringify({ message: errors, success: false }));
					}
					const user = await UserModel.findOne({
						$or: [{ email: result?.data?.identifier }, { username: result?.data?.identifier }],
					});
					if (!user) {
						throw new Error(JSON.stringify({ message: 'Incorrect credentials', status: false }));
					}
					if (!user.isVerified) {
						throw new Error(JSON.stringify({ message: 'Please verify your account first', status: false, issue: 'verification' }));
					}
					const isPasswordCorrect = await user.isPasswordCorrect(result?.data?.password);

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
