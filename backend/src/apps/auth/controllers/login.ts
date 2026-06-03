import type { Request, Response, NextFunction } from 'express';
import { loginDto } from '../dtos/login.js';
import { loginService } from '../services/login.js';
import { success, fail } from '../../../utils/envelope.js';

export async function loginController(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = loginDto.safeParse(req.body);
    if (!parsed.success) {
      fail(res, 'Validation failed', 400, parsed.error.flatten().fieldErrors);
      return;
    }

    const result = await loginService(parsed.data);

    res.cookie('authorization', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });

    success(res, 'Login successful', { user: result.user });
  } catch (err: any) {
    if (err.status) {
      fail(res, err.message, err.status);
    } else {
      next(err);
    }
  }
}
