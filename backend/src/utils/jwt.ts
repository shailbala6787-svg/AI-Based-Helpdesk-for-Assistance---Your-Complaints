import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { JWT_EXPIRY } from '../constants/enums.js';
import type { Role } from '../constants/roles.js';

export interface JwtPayload {
  userId: number;
  role: Role;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: JWT_EXPIRY });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, config.jwtSecret) as JwtPayload;
}
