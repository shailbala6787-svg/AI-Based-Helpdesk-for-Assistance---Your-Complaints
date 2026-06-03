import { complaintsDAL } from '../../../db/dal/complaints.js';
import { ROLES } from '../../../constants/roles.js';
import type { Role } from '../../../constants/roles.js';

export async function listService(userId: number, role: Role) {
  if (role === ROLES.ADMIN) {
    return complaintsDAL.findAll();
  }
  return complaintsDAL.findByUserId(userId);
}
