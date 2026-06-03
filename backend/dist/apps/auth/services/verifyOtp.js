import { usersDAL } from '../../../db/dal/users.js';
import { otpsDAL } from '../../../db/dal/otps.js';
import { compareValue } from '../../../utils/hash.js';
import { OTP_PURPOSES } from '../../../constants/enums.js';
export async function verifyOtpService(data) {
    const user = await usersDAL.findByEmail(data.email);
    if (!user) {
        throw { status: 404, message: 'User not found' };
    }
    if (user.verified) {
        throw { status: 400, message: 'Email already verified' };
    }
    const otpRecord = await otpsDAL.findLatestByUserAndPurpose(user.id, OTP_PURPOSES.SIGNUP);
    if (!otpRecord) {
        throw { status: 400, message: 'No OTP found. Please request a new one' };
    }
    if (new Date() > otpRecord.expiresAt) {
        throw { status: 400, message: 'OTP has expired. Please request a new one' };
    }
    const isValid = await compareValue(data.otp, otpRecord.otpHash);
    if (!isValid) {
        throw { status: 400, message: 'Invalid OTP' };
    }
    await usersDAL.updateVerified(user.id, true);
    await otpsDAL.deleteByUserAndPurpose(user.id, OTP_PURPOSES.SIGNUP);
    return { verified: true };
}
//# sourceMappingURL=verifyOtp.js.map