import { complaintsDAL } from '../../../db/dal/complaints.js';
import { complaintEmbeddingsDAL } from '../../../db/dal/complaintEmbeddings.js';
import { generateEmbedding } from '../../../utils/openai.js';
import { ROLES } from '../../../constants/roles.js';
export async function updateService(complaintId, userId, role, data) {
    const complaint = await complaintsDAL.findById(complaintId);
    if (!complaint) {
        throw { status: 404, message: 'Complaint not found' };
    }
    if (role !== ROLES.ADMIN && complaint.userId !== userId) {
        throw { status: 403, message: 'Access denied' };
    }
    const updateData = {};
    if (data.title !== undefined)
        updateData.title = data.title;
    if (data.complainantName !== undefined)
        updateData.complainantName = data.complainantName;
    if (data.complainantContact !== undefined)
        updateData.complainantContact = data.complainantContact;
    if (data.incidentDatetime !== undefined)
        updateData.incidentDatetime = new Date(data.incidentDatetime);
    if (data.incidentPlace !== undefined)
        updateData.incidentPlace = data.incidentPlace;
    if (data.accusedDetails !== undefined)
        updateData.accusedDetails = data.accusedDetails;
    if (data.description !== undefined)
        updateData.description = data.description;
    if (data.ipcSections !== undefined)
        updateData.ipcSections = data.ipcSections;
    const updated = await complaintsDAL.update(complaintId, updateData);
    const description = data.description ?? complaint.description;
    const ipcSections = data.ipcSections ?? complaint.ipcSections;
    const embeddingText = `${description} ${ipcSections.join(', ')}`;
    const embedding = await generateEmbedding(embeddingText);
    await complaintEmbeddingsDAL.upsert(complaintId, embedding);
    return updated;
}
//# sourceMappingURL=update.js.map