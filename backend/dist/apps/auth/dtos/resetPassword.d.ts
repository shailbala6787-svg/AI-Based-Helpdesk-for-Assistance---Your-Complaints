import { z } from 'zod';
export declare const resetPasswordDto: z.ZodObject<{
    email: z.ZodString;
    otp: z.ZodString;
    newPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    otp: string;
    newPassword: string;
}, {
    email: string;
    otp: string;
    newPassword: string;
}>;
export type ResetPasswordDto = z.infer<typeof resetPasswordDto>;
//# sourceMappingURL=resetPassword.d.ts.map