import { usersDAL } from '../../../db/dal/users.js';
import { otpsDAL } from '../../../db/dal/otps.js';
import { hashValue } from '../../../utils/hash.js';
import { sendOtpEmail } from '../../../utils/resend.js';
import { OTP_PURPOSES, OTP_TTL_MINUTES } from '../../../constants/enums.js';
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
export async function forgotPasswordService(email) {
    const user = await usersDAL.findByEmail(email);
    if (!user) {
        throw { status: 404, message: 'User not found' };
    }
    await otpsDAL.deleteByUserAndPurpose(user.id, OTP_PURPOSES.RESET);
    const otp = generateOtp();
    const otpHash = await hashValue(otp);
    const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);
    await otpsDAL.create({
        userId: user.id,
        otpHash,
        purpose: OTP_PURPOSES.RESET,
        expiresAt,
    });
    await sendOtpEmail(email, otp, OTP_PURPOSES.RESET);
}
//# sourceMappingURL=forgotPassword.js.map