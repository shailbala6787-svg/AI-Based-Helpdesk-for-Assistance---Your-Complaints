import { z } from 'zod';
export const resetPasswordDto = z.object({
    email: z.string().email('Invalid email'),
    otp: z.string().length(6, 'OTP must be 6 digits'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});
//# sourceMappingURL=resetPassword.js.map