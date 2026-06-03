import { z } from 'zod';
export declare const forgotPasswordDto: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export type ForgotPasswordDto = z.infer<typeof forgotPasswordDto>;
//# sourceMappingURL=forgotPassword.d.ts.map