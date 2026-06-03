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

  let user;

  if (existing && existing.verified) {
    throw { status: 409, message: 'Email already registered' };
  }

  if (existing && !existing.verified) {
    // User exists but never verified — update password and resend OTP
    const passwordHash = await hashValue(data.password);
    await usersDAL.updatePassword(existing.id, passwordHash);
    user = { ...existing, passwordHash };

    // Clean up old signup OTPs
    await otpsDAL.deleteByUserAndPurpose(existing.id, OTP_PURPOSES.SIGNUP);
  } else {
    // Brand new user
    const passwordHash = await hashValue(data.password);
    user = await usersDAL.create({
      name: data.name,
      email: data.email,
      passwordHash,
    });
  }

  const otp = generateOtp();
  const otpHash = await hashValue(otp);
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  await otpsDAL.create({
    userId: user.id,
    otpHash,
    purpose: OTP_PURPOSES.SIGNUP,
    expiresAt,
  });

  try {
    await sendOtpEmail(data.email, otp, OTP_PURPOSES.SIGNUP);
  } catch (emailErr) {
    console.error('Failed to send OTP email:', emailErr);
    // Don't fail signup — user can use "Resend OTP" on the verify page
  }

  return { userId: user.id, email: user.email };
}
