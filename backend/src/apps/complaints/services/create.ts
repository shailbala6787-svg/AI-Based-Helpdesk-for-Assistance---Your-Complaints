import { complaintsDAL } from '../../../db/dal/complaints.js';
import { complaintEmbeddingsDAL } from '../../../db/dal/complaintEmbeddings.js';
import { generateEmbedding } from '../../../utils/openai.js';
import type { CreateComplaintDto } from '../dtos/create.js';

export async function createService(userId: number, data: CreateComplaintDto) {
  const complaint = await complaintsDAL.create({
    userId,
    title: data.title,
    complainantName: data.complainantName,
    complainantContact: data.complainantContact,
    incidentDatetime: new Date(data.incidentDatetime),
    incidentPlace: data.incidentPlace,
    accusedDetails: data.accusedDetails,
    description: data.description,
    ipcSections: data.ipcSections,
    imageUrl: data.imageUrl,
  });

  const embeddingText = `${data.description} ${data.ipcSections.join(', ')}`;
  const embedding = await generateEmbedding(embeddingText);
  await complaintEmbeddingsDAL.upsert(complaint.id, embedding);

  return complaint;
}
