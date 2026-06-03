import type { Request, Response, NextFunction } from 'express';
import { resendOtpService } from '../services/resendOtp.js';
import { success, fail } from '../../../utils/envelope.js';

export async function resendOtpController(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;
    if (!email) {
      fail(res, 'Email is required', 400);
      return;
    }

    await resendOtpService(email);
    success(res, 'OTP resent successfully');
  } catch (err: any) {
    if (err.status) {
      fail(res, err.message, err.status);
    } else {
      next(err);
    }
  }
}
