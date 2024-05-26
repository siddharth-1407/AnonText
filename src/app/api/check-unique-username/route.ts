import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User.model';
import { usernameValidation } from '@/Schemas/signup.schema';

export async function GET(request: Request) {
	await dbConnect();
	const { searchParams } = new URL(request.url);
	const queryParams = { username: searchParams.get('username') || '' };
	if (!queryParams.username) {
		return Response.json({ success: false, message: 'username not provided in search params' }, { status: 400 });
	}
	try {
		const result = usernameValidation.safeParse(queryParams.username);
		if (!result.success) {
			const usernameErrors = result.error.format()._errors.join(',');
			return Response.json({ success: false, message: usernameErrors || 'username validation failed' }, { status: 400 });
		}
		const user = await UserModel.findOne({ username: result.data });
		if (user) {
			return Response.json({ success: false, message: 'Username already taken' }, { status: 202 });
		}
		return Response.json({ success: true, message: 'username is available' }, { status: 200 });
	} catch (error) {
		console.error('Error checking username : ', error);
		return Response.json({ success: false, message: 'Error checking username' }, { status: 500 });
	}
}
