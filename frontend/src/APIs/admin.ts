import api from '../lib/axios';
import { ENDPOINTS } from '../constants/endpoints';
import type { User } from './auth';

export async function searchUsers(query: string) {
  const res = await api.get(ENDPOINTS.ADMIN.USERS, { params: { query } });
  return res.data as { status: string; message: string; data: Omit<User, 'passwordHash'>[] };
}

export async function updateUserLimits(
  userId: number,
  data: { uploadLimit?: number; searchLimit?: number },
) {
  const res = await api.patch(ENDPOINTS.ADMIN.UPDATE_LIMITS(userId), data);
  return res.data;
}
