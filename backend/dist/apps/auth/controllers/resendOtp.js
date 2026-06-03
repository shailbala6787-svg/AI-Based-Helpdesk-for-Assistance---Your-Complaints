import { resendOtpService } from '../services/resendOtp.js';
import { success, fail } from '../../../utils/envelope.js';
export async function resendOtpController(req, res, next) {
    try {
        const { email } = req.body;
        if (!email) {
            fail(res, 'Email is required', 400);
            return;
        }
        await resendOtpService(email);
        success(res, 'OTP resent successfully');
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
//# sourceMappingURL=resendOtp.js.map