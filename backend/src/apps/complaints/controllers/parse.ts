import type { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { parseService } from '../services/parse.js';
import { success, fail } from '../../../utils/envelope.js';

const upload = multer({ storage: multer.memoryStorage() });

export const parseUpload = upload.single('image');

export async function parseController(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) {
      fail(res, 'Image file is required', 400);
      return;
    }

    const result = await parseService(req.user!.userId, req.file);
    success(res, 'Image parsed successfully', result);
  } catch (err: any) {
    if (err.status) {
      fail(res, err.message, err.status);
    } else {
      next(err);
    }
  }
}
