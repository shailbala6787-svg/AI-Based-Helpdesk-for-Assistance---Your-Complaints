import type { Request, Response, NextFunction } from 'express';
import { verifyOtpDto } from '../dtos/verifyOtp.js';
import { verifyOtpService } from '../services/verifyOtp.js';
import { success, fail } from '../../../utils/envelope.js';

export async function verifyOtpController(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = verifyOtpDto.safeParse(req.body);
    if (!parsed.success) {
      fail(res, 'Validation failed', 400, parsed.error.flatten().fieldErrors);
      return;
    }

    const result = await verifyOtpService(parsed.data);
    success(res, 'Email verified successfully', result);
  } catch (err: any) {
    if (err.status) {
      fail(res, err.message, err.status);
    } else {
      next(err);
    }
  }
}
