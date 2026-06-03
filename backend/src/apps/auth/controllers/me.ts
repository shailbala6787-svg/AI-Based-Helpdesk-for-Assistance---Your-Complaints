import type { Request, Response, NextFunction } from 'express';
import { meService } from '../services/me.js';
import { success, fail } from '../../../utils/envelope.js';

export async function meController(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await meService(req.user!.userId);
    success(res, 'User fetched successfully', user);
  } catch (err: any) {
    if (err.status) {
      fail(res, err.message, err.status);
    } else {
      next(err);
    }
  }
}
