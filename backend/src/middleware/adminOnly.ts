import type { Request, Response, NextFunction } from 'express';
import { ROLES } from '../constants/roles.js';
import { fail } from '../utils/envelope.js';

export function adminOnly(req: Request, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== ROLES.ADMIN) {
    fail(res, 'Admin access required', 403);
    return;
  }
  next();
}
