import { z } from 'zod';

const ChangePasswordSchema = z
	.object({
		currentPassword: z.string().min(1, { message: 'this field is required' }),
		newPassword: z
			.string()
			.min(8, { message: 'password must be at least 8 characters' })
			.max(20, { message: 'password must be at most 20 characters' }),
		confirmPassword: z.string(),
	})
	.refine(
		({ confirmPassword, newPassword }) => {
			return confirmPassword === newPassword;
		},
		{
			message: 'The passwords did not match',
			path: ['confirmPassword'],
		}
	);

export default ChangePasswordSchema;
