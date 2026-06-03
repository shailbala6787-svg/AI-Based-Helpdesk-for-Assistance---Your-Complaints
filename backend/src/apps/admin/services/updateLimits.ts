import { usersDAL } from '../../../db/dal/users.js';
import type { UpdateLimitsDto } from '../dtos/updateLimits.js';

export async function updateLimitsService(userId: number, data: UpdateLimitsDto) {
  const user = await usersDAL.findById(userId);
  if (!user) {
    throw { status: 404, message: 'User not found' };
  }

  await usersDAL.updateLimits(userId, {
    uploadLimit: data.uploadLimit,
    searchLimit: data.searchLimit,
  });

  const updated = await usersDAL.findById(userId);
  const { passwordHash, ...rest } = updated!;
  return rest;
}
