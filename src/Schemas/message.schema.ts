import { z } from 'zod';

export const messageSchema = z.object({
	message: z
		.string()
		.min(10, { message: 'Message must be at lest of 10 characters' })
		.max(300, { message: 'Message must be no longer then 300 characters' }),
	isAnonymous: z.boolean().default(true),
});
