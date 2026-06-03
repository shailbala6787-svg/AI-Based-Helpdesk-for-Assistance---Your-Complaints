import { z } from 'zod';
export const forgotPasswordDto = z.object({
    email: z.string().email('Invalid email'),
});
//# sourceMappingURL=forgotPassword.js.map