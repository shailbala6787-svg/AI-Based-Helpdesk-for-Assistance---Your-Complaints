import type { Request, Response, NextFunction } from 'express';
import { deleteService } from '../services/delete.js';
import { success, fail } from '../../../utils/envelope.js';
import type { Role } from '../../../constants/roles.js';

export async function deleteController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      fail(res, 'Invalid complaint ID', 400);
      return;
    }

    await deleteService(id, req.user!.userId, req.user!.role as Role);
    success(res, 'Complaint deleted successfully');
  } catch (err: any) {
    if (err.status) {
      fail(res, err.message, err.status);
    } else {
      next(err);
    }
  }
}
