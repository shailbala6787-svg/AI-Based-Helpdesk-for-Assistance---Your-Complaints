import type { Request, Response, NextFunction } from 'express';
import { searchUsersService } from '../services/searchUsers.js';
import { success, fail } from '../../../utils/envelope.js';

export async function searchUsersController(req: Request, res: Response, next: NextFunction) {
  try {
    const query = (req.query.query as string) || '';
    const users = await searchUsersService(query);
    success(res, 'Users fetched successfully', users);
  } catch (err: any) {
    if (err.status) {
      fail(res, err.message, err.status);
    } else {
      next(err);
    }
  }
}
