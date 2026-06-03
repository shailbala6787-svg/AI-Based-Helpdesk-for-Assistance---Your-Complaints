import type { Request, Response, NextFunction } from 'express';
import { updateComplaintDto } from '../dtos/update.js';
import { updateService } from '../services/update.js';
import { success, fail } from '../../../utils/envelope.js';
import type { Role } from '../../../constants/roles.js';

export async function updateController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      fail(res, 'Invalid complaint ID', 400);
      return;
    }

    const parsed = updateComplaintDto.safeParse(req.body);
    if (!parsed.success) {
      fail(res, 'Validation failed', 400, parsed.error.flatten().fieldErrors);
      return;
    }

    const complaint = await updateService(id, req.user!.userId, req.user!.role as Role, parsed.data);
    success(res, 'Complaint updated successfully', complaint);
  } catch (err: any) {
    if (err.status) {
      fail(res, err.message, err.status);
    } else {
      next(err);
    }
  }
}
