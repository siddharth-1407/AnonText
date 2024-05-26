import { z } from 'zod';

export const usernameValidation = z
	.string()
	.min(5, 'Username must be at least 5 characters')
	.max(20, 'Username must be at most 20 characters')
	.regex(/^[a-zA-Z0-9_]+$/, 'Username must not include special characters');

export const SignupSchema = z.object({
	username: usernameValidation,
	email: z.string().email({ message: 'invalid email address' }),
    password: z.string().min(8, {message: 'password must be at least 8 characters'}).max(20, {message: 'password must be at most 20 characters'}),
});
