import { usersDAL } from '../../../db/dal/users.js';
import { otpsDAL } from '../../../db/dal/otps.js';
import { hashValue, compareValue } from '../../../utils/hash.js';
import { OTP_PURPOSES } from '../../../constants/enums.js';
import type { ResetPasswordDto } from '../dtos/resetPassword.js';

export async function resetPasswordService(data: ResetPasswordDto) {
  const user = await usersDAL.findByEmail(data.email);
  if (!user) {
    throw { status: 404, message: 'User not found' };
  }

  const otpRecord = await otpsDAL.findLatestByUserAndPurpose(user.id, OTP_PURPOSES.RESET);
  if (!otpRecord) {
    throw { status: 400, message: 'No reset OTP found. Please request a new one' };
  }

  if (new Date() > otpRecord.expiresAt) {
    throw { status: 400, message: 'OTP has expired. Please request a new one' };
  }

  const isValid = await compareValue(data.otp, otpRecord.otpHash);
  if (!isValid) {
    throw { status: 400, message: 'Invalid OTP' };
  }

  const passwordHash = await hashValue(data.newPassword);
  await usersDAL.updatePassword(user.id, passwordHash);
  await otpsDAL.deleteByUserAndPurpose(user.id, OTP_PURPOSES.RESET);
}
