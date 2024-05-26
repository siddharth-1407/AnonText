import { z } from 'zod';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User.model';
import verifySchema from '@/Schemas/verify.schema';
import { usernameValidation } from '@/Schemas/signup.schema';

const validateVerifyCodeSchema = z.object({
	username: usernameValidation,
	verifyCode: verifySchema,
});

export async function PATCH(request: Request) {
	await dbConnect();
	const { username, verifyCode } = await request.json();
	try {
		const result = validateVerifyCodeSchema.safeParse({ username, verifyCode });
		if (!result.success) {
			const errors = result.error.format()._errors.join(',');
			return Response.json({ success: false, message: errors || 'username or verify code zod validation failed' }, { status: 400 });
		}
		const user = await UserModel.findOne({ username: result.data.username, isVerified: false });
		if (!user) {
			return Response.json({ success: false, message: 'user not found' }, { status: 404 });
		}
		const isVerifyCodeCorrect = await user.isVerifyCodeCorrect(result.data.verifyCode);
		if (!isVerifyCodeCorrect.success) {
			return Response.json(isVerifyCodeCorrect, { status: isVerifyCodeCorrect.status });
		}
		user.isVerified = true;
		await user.save({ validateBeforeSave: false });
		return Response.json({ success: true, message: 'user verification successful' }, { status: 200 });
	} catch (error) {
		console.error('Error while verifying code: ', error);
		return Response.json(
			{
				success: false,
				message: 'Error while verifying code',
			},
			{ status: 500 }
		);
	}
}
