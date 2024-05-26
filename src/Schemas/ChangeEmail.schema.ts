import { z } from 'zod';

const ChangeEmailSchema = z.object({
	email: z.string().email({ message: 'invalid email address' }),
	currentPassword: z
		.string()
		.min(8, { message: 'password must be at least 8 characters' })
		.max(20, { message: 'password must be at most 20 characters' }),
});

export default ChangeEmailSchema;
