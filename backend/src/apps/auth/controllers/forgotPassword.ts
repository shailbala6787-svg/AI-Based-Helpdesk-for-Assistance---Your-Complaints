import type { Request, Response, NextFunction } from 'express';
import { forgotPasswordDto } from '../dtos/forgotPassword.js';
import { forgotPasswordService } from '../services/forgotPassword.js';
import { success, fail } from '../../../utils/envelope.js';

export async function forgotPasswordController(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = forgotPasswordDto.safeParse(req.body);
    if (!parsed.success) {
      fail(res, 'Validation failed', 400, parsed.error.flatten().fieldErrors);
      return;
    }

    await forgotPasswordService(parsed.data.email);
    success(res, 'Password reset OTP sent to your email');
  } catch (err: any) {
    if (err.status) {
      fail(res, err.message, err.status);
    } else {
      next(err);
    }
  }
}
