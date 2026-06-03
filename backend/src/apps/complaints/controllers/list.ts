import type { Request, Response, NextFunction } from 'express';
import { listService } from '../services/list.js';
import { success, fail } from '../../../utils/envelope.js';
import type { Role } from '../../../constants/roles.js';

export async function listController(req: Request, res: Response, next: NextFunction) {
  try {
    const complaints = await listService(req.user!.userId, req.user!.role as Role);
    success(res, 'Complaints fetched successfully', complaints);
  } catch (err: any) {
    if (err.status) {
      fail(res, err.message, err.status);
    } else {
      next(err);
    }
  }
}
