import { signupDto } from '../dtos/signup.js';
import { signupService } from '../services/signup.js';
import { success, fail } from '../../../utils/envelope.js';
export async function signupController(req, res, next) {
    try {
        const parsed = signupDto.safeParse(req.body);
        if (!parsed.success) {
            fail(res, 'Validation failed', 400, parsed.error.flatten().fieldErrors);
            return;
        }
        const result = await signupService(parsed.data);
        success(res, 'Signup successful. Please verify your email', result, 201);
    }
    catch (err) {
        if (err.status) {
            fail(res, err.message, err.status);
        }
        else {
            console.error('Signup error:', err);
            next(err);
        }
    }
}
//# sourceMappingURL=signup.js.map