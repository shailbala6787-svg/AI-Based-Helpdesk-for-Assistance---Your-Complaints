import { verifyOtpDto } from '../dtos/verifyOtp.js';
import { verifyOtpService } from '../services/verifyOtp.js';
import { success, fail } from '../../../utils/envelope.js';
export async function verifyOtpController(req, res, next) {
    try {
        const parsed = verifyOtpDto.safeParse(req.body);
        if (!parsed.success) {
            fail(res, 'Validation failed', 400, parsed.error.flatten().fieldErrors);
            return;
        }
        const result = await verifyOtpService(parsed.data);
        success(res, 'Email verified successfully', result);
    }
    catch (err) {
        if (err.status) {
            fail(res, err.message, err.status);
        }
        else {
            next(err);
        }
    }
}
//# sourceMappingURL=verifyOtp.js.map