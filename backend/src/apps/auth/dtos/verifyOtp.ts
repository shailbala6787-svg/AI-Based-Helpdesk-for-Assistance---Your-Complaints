import { z } from 'zod';

export const verifyOtpDto = z.object({
  email: z.string().email('Invalid email'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export type VerifyOtpDto = z.infer<typeof verifyOtpDto>;
