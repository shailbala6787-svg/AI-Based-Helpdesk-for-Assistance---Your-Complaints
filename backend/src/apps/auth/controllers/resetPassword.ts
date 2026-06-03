import type { Request, Response, NextFunction } from 'express';
import { resetPasswordDto } from '../dtos/resetPassword.js';
import { resetPasswordService } from '../services/resetPassword.js';
import { success, fail } from '../../../utils/envelope.js';

export async function resetPasswordController(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = resetPasswordDto.safeParse(req.body);
    if (!parsed.success) {
      fail(res, 'Validation failed', 400, parsed.error.flatten().fieldErrors);
      return;
    }

    await resetPasswordService(parsed.data);
    success(res, 'Password reset successful');
  } catch (err: any) {
    if (err.status) {
      fail(res, err.message, err.status);
    } else {
      next(err);
    }
  }
}
