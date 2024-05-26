import * as z from 'zod';

const UpdateProfileSchema = z
	.object({
		avatar: typeof window === 'undefined' ? z.any() : z.instanceof(FileList).optional(),
		status: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		if (data.avatar.length == 0 && (data.status == undefined || data.status == '')) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Update at least one field',
				path: ['avatar'],
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Update at least one field',
				path: ['status'],
			});
		}
	});

export default UpdateProfileSchema;
