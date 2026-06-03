import { z } from 'zod';
export declare const verifyOtpDto: z.ZodObject<{
    email: z.ZodString;
    otp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    otp: string;
}, {
    email: string;
    otp: string;
}>;
export type VerifyOtpDto = z.infer<typeof verifyOtpDto>;
//# sourceMappingURL=verifyOtp.d.ts.map