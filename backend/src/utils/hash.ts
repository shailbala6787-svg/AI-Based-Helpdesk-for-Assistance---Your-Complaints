import bcrypt from 'bcryptjs';
import { BCRYPT_COST } from '../constants/enums.js';

export async function hashValue(plain: string): Promise<string> {
  return bcrypt.hash(plain, BCRYPT_COST);
}

export async function compareValue(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
