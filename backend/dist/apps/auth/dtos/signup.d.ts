import { z } from 'zod';
export declare const signupDto: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export type SignupDto = z.infer<typeof signupDto>;
//# sourceMappingURL=signup.d.ts.map