import { usersDAL } from '../../../db/dal/users.js';
import { otpsDAL } from '../../../db/dal/otps.js';
import { hashValue } from '../../../utils/hash.js';
import { sendOtpEmail } from '../../../utils/resend.js';
import { OTP_PURPOSES, OTP_TTL_MINUTES, OTP_LENGTH } from '../../../constants/enums.js';
import type { SignupDto } from '../dtos/signup.js';

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function signupService(data: SignupDto) {
  const existing = await usersDAL.findByEmail(data.email);
  if (existing) {
    throw { status: 409, message: 'Email already registered' };
  }

  const passwordHash = await hashValue(data.password);
  const user = await usersDAL.create({
    name: data.name,
    email: data.email,
    passwordHash,
  });

  const otp = generateOtp();
  const otpHash = await hashValue(otp);
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  await otpsDAL.create({
    userId: user.id,
    otpHash,
    purpose: OTP_PURPOSES.SIGNUP,
    expiresAt,
  });

  await sendOtpEmail(data.email, otp, OTP_PURPOSES.SIGNUP);

  return { userId: user.id, email: user.email };
}
