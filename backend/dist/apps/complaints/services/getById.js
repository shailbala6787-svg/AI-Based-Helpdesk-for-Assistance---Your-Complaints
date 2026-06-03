import { complaintsDAL } from '../../../db/dal/complaints.js';
import { ROLES } from '../../../constants/roles.js';
export async function getByIdService(complaintId, userId, role) {
    const complaint = await complaintsDAL.findById(complaintId);
    if (!complaint) {
        throw { status: 404, message: 'Complaint not found' };
    }
    if (role !== ROLES.ADMIN && complaint.userId !== userId) {
        throw { status: 403, message: 'Access denied' };
    }
    return complaint;
}
//# sourceMappingURL=getById.js.map