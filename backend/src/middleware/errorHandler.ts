import type { Request, Response, NextFunction } from 'express';
import { fail } from '../utils/envelope.js';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error('Unhandled error:', err.message);
  fail(res, 'Internal server error', 500);
}
