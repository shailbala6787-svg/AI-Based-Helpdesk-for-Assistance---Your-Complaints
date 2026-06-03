import type { Response } from 'express';

interface SuccessEnvelope {
  status: 'success';
  message: string;
  data?: unknown;
}

interface FailEnvelope {
  status: 'fail';
  message: string;
  error?: unknown;
}

export function success(res: Response, message: string, data?: unknown, statusCode: number = 200) {
  const body: SuccessEnvelope = { status: 'success', message };
  if (data !== undefined) body.data = data;
  res.status(statusCode).json(body);
}

export function fail(res: Response, message: string, statusCode: number = 400, error?: unknown) {
  const body: FailEnvelope = { status: 'fail', message };
  if (error !== undefined) body.error = error;
  res.status(statusCode).json(body);
}
