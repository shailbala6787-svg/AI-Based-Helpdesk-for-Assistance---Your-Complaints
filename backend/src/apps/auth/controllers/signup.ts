import type { Request, Response, NextFunction } from 'express';
import { signupDto } from '../dtos/signup.js';
import { signupService } from '../services/signup.js';
import { success, fail } from '../../../utils/envelope.js';

export async function signupController(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = signupDto.safeParse(req.body);
    if (!parsed.success) {
      fail(res, 'Validation failed', 400, parsed.error.flatten().fieldErrors);
      return;
    }

    const result = await signupService(parsed.data);
    success(res, 'Signup successful. Please verify your email', result, 201);
  } catch (err: any) {
    if (err.status) {
      fail(res, err.message, err.status);
    } else {
      next(err);
    }
  }
}
