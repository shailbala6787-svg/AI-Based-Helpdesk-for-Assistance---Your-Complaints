import type { Request, Response, NextFunction } from 'express';
import { createComplaintDto } from '../dtos/create.js';
import { createService } from '../services/create.js';
import { success, fail } from '../../../utils/envelope.js';

export async function createController(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createComplaintDto.safeParse(req.body);
    if (!parsed.success) {
      fail(res, 'Validation failed', 400, parsed.error.flatten().fieldErrors);
      return;
    }

    const complaint = await createService(req.user!.userId, parsed.data);
    success(res, 'Complaint created successfully', complaint, 201);
  } catch (err: any) {
    if (err.status) {
      fail(res, err.message, err.status);
    } else {
      next(err);
    }
  }
}
