import { complaintsDAL } from '../../../db/dal/complaints.js';
import { ROLES } from '../../../constants/roles.js';
export async function listService(userId, role) {
    if (role === ROLES.ADMIN) {
        return complaintsDAL.findAll();
    }
    return complaintsDAL.findByUserId(userId);
}
//# sourceMappingURL=list.js.map