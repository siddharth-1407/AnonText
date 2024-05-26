import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User.model';
import sendVerificationEmail from '@/helpers/sendVerificationEmail';

export async function POST(request: Request): Promise<Response> {
	await dbConnect();
	let newUser;
	try {
		const { email, username, password } = await request.json();

		if (!email || !username || !password) return Response.json({ success: false, message: 'required fields not provided' }, { status: 400 });

		const existingUserWithUsername = await UserModel.findOne({ username, isVerified: true }).select('-password');

		if (existingUserWithUsername) {
			return Response.json(
				{
					success: false,
					message: 'username is already taken',
				},
				{
					status: 400,
				}
			);
		}
		const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

		const existingUserWithEmail = await UserModel.findOne({ email }).select('-password');

		if (existingUserWithEmail) {
			return Response.json({ success: false, message: 'User with the email already exists' }, { status: 400 });
		} else {
			const verifyCodeExpiry = new Date();
			verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);
			newUser = new UserModel({
				username,
				email,
				password,
				verifyCode,
				verifyCodeExpiry,
			});
			await newUser.save();
		}

		// send verification email

		const verificationEmailResponse = await sendVerificationEmail(email, username, verifyCode);
		if (!verificationEmailResponse.success) {
			if (newUser) {
				const deletedUser = await UserModel.deleteOne({ _id: newUser._id });
				console.log(deletedUser);
			}
			return Response.json(
				{
					success: false,
					message: 'Error registering user, please try again!',
				},
				{ status: 500 }
			);
		}
		return Response.json({ success: true, message: 'Verification email sent successfully' }, { status: 201 });
	} catch (error) {
		console.error('Error registering user : ', error);
		console.log(newUser);
		if (newUser) {
			const deletedUser = await UserModel.deleteOne({ _id: newUser._id });
			console.log(deletedUser);
		}
		return Response.json(
			{
				success: false,
				message: 'Error registering user',
			},
			{ status: 500 }
		);
	}
}
