import * as z from 'zod';

const ReplySchema = z.object({
	id: z.string().optional(),
	reply: z.string().min(1, { message: 'This field is required' }).max(300, { message: 'Reply must be at most 300 characters' }),
});

export default ReplySchema;
