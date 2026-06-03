import { complaintsDAL } from '../../../db/dal/complaints.js';
import { complaintEmbeddingsDAL } from '../../../db/dal/complaintEmbeddings.js';
import { ROLES } from '../../../constants/roles.js';
export async function deleteService(complaintId, userId, role) {
    const complaint = await complaintsDAL.findById(complaintId);
    if (!complaint) {
        throw { status: 404, message: 'Complaint not found' };
    }
    if (role !== ROLES.ADMIN && complaint.userId !== userId) {
        throw { status: 403, message: 'Access denied' };
    }
    await complaintEmbeddingsDAL.deleteByComplaintId(complaintId);
    await complaintsDAL.remove(complaintId);
}
//# sourceMappingURL=delete.js.map