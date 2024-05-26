import UserModel, { User } from '@/model/User.model';
import { usernameValidation } from '@/Schemas/signup.schema';
import sendVerificationEmail from '@/helpers/sendVerificationEmail';

export async function PATCH(request: Request) {
	const { username } = await request.json();
	let user: User | null;
	try {
		const result = usernameValidation.safeParse(username);
		if (!result?.success) {
			const errors = result?.error?.format()?._errors?.join(',');
			return Response.json({ success: false, message: errors || 'Username type validation failed' }, { status: 400 });
		}
		const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
		const verifyCodeExpiry = new Date();
		verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);
		user = await UserModel.findOneAndUpdate(
			{ username },
			{
				verifyCode,
				verifyCodeExpiry,
			}
		);
		if (!user) {
			return Response.json({ success: false, message: 'User not found' }, { status: 404 });
		}
		if (user.isVerified) {
			return Response.json({ success: false, message: 'User is already verified' }, { status: 400 });
		}

		// send verify code to email
		const emailResponse = await sendVerificationEmail(user.email, username, verifyCode);
		if (!emailResponse.success) {
			return Response.json({ success: false, message: 'Error sending verification code' }, { status: 500 });
		}
		return Response.json({ success: true, message: 'Verify code sent successfully' }, { status: 200 });
	} catch (error) {
		console.log('Error renewing verify code: ', error);
		return Response.json({ success: false, message: 'Error sending verification code' }, { status: 500 });
	}
}
