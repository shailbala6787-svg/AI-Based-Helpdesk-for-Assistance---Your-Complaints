import type { Request, Response, NextFunction } from 'express';
import { getByIdService } from '../services/getById.js';
import { success, fail } from '../../../utils/envelope.js';
import type { Role } from '../../../constants/roles.js';

export async function getByIdController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      fail(res, 'Invalid complaint ID', 400);
      return;
    }

    const complaint = await getByIdService(id, req.user!.userId, req.user!.role as Role);
    success(res, 'Complaint fetched successfully', complaint);
  } catch (err: any) {
    if (err.status) {
      fail(res, err.message, err.status);
    } else {
      next(err);
    }
  }
}
