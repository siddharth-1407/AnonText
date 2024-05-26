import resend from '@/lib/resend';
import VerificationEmail from '@/emails/verificationEmail';
import { ApiResponse } from '@/types/ApiResponse';

export default async function sendVerificationEmail(email: string, username: string, verifyCode: string): Promise<ApiResponse> {
	if (!email || !username || !verifyCode) return { success: false, message: 'Required fields not provided' };
	try {
		const response = await resend.emails.send({
			from: 'AnonText <no-reply@serny.in>',
			to: [email],
			subject: `Your verification code is : ${verifyCode}`,
			react: VerificationEmail({ username: username, verifyCode: verifyCode }),
		});
		if (!response.error) {
			return { success: true, message: 'verification email sent successfully' };
		} else {
			return { success: false, message: response.error?.message || 'Error sending email' };
		}
	} catch (emailError) {
		console.log('Error sending verification email: ', emailError);
		return { success: false, message: 'failed to send verification email' };
	}
}
