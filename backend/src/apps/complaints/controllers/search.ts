import type { Request, Response, NextFunction } from 'express';
import { searchComplaintDto } from '../dtos/search.js';
import { searchService } from '../services/search.js';
import { success, fail } from '../../../utils/envelope.js';

export async function searchController(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = searchComplaintDto.safeParse(req.query);
    if (!parsed.success) {
      fail(res, 'Validation failed', 400, parsed.error.flatten().fieldErrors);
      return;
    }

    const results = await searchService(
      req.user!.userId,
      parsed.data.q,
      parsed.data.ai === 'true',
    );
    success(res, 'Search completed', results);
  } catch (err: any) {
    if (err.status) {
      fail(res, err.message, err.status);
    } else {
      next(err);
    }
  }
}
