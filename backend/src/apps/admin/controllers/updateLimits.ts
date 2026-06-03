import type { Request, Response, NextFunction } from 'express';
import { updateLimitsDto } from '../dtos/updateLimits.js';
import { updateLimitsService } from '../services/updateLimits.js';
import { success, fail } from '../../../utils/envelope.js';

export async function updateLimitsController(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = parseInt(req.params.id as string, 10);
    if (isNaN(userId)) {
      fail(res, 'Invalid user ID', 400);
      return;
    }

    const parsed = updateLimitsDto.safeParse(req.body);
    if (!parsed.success) {
      fail(res, 'Validation failed', 400, parsed.error.flatten().fieldErrors);
      return;
    }

    const user = await updateLimitsService(userId, parsed.data);
    success(res, 'Limits updated successfully', user);
  } catch (err: any) {
    if (err.status) {
      fail(res, err.message, err.status);
    } else {
      next(err);
    }
  }
}
