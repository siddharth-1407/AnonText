import { z } from 'zod';

const verifySchema = z.string().length(6, 'Verification code must be of 6 digits');

export default verifySchema;
