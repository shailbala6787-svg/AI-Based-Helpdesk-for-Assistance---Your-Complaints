import type { Request, Response } from 'express';
import { success } from '../../../utils/envelope.js';

export function logoutController(_req: Request, res: Response) {
  res.clearCookie('authorization', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  success(res, 'Logged out successfully');
}
