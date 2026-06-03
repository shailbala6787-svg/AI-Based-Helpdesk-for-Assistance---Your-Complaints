import { eq, sql } from 'drizzle-orm';
import { db } from '../drizzle.js';
import { complaintEmbeddings } from '../schema/complaintEmbeddings.js';
import { complaints } from '../schema/complaints.js';
export const complaintEmbeddingsDAL = {
    async upsert(complaintId, embedding) {
        const existing = await db
            .select()
            .from(complaintEmbeddings)
            .where(eq(complaintEmbeddings.complaintId, complaintId))
            .limit(1);
        if (existing.length > 0) {
            await db
                .update(complaintEmbeddings)
                .set({ embedding, updatedAt: new Date() })
                .where(eq(complaintEmbeddings.complaintId, complaintId));
        }
        else {
            await db.insert(complaintEmbeddings).values({ complaintId, embedding });
        }
    },
    async deleteByComplaintId(complaintId) {
        await db
            .delete(complaintEmbeddings)
            .where(eq(complaintEmbeddings.complaintId, complaintId));
    },
    async semanticSearch(queryEmbedding, limit = 10) {
        const vectorStr = `[${queryEmbedding.join(',')}]`;
        const results = await db
            .select({
            id: complaints.id,
            userId: complaints.userId,
            title: complaints.title,
            complainantName: complaints.complainantName,
            complainantContact: complaints.complainantContact,
            incidentDatetime: complaints.incidentDatetime,
            incidentPlace: complaints.incidentPlace,
            accusedDetails: complaints.accusedDetails,
            description: complaints.description,
            ipcSections: complaints.ipcSections,
            imageUrl: complaints.imageUrl,
            createdAt: complaints.createdAt,
            updatedAt: complaints.updatedAt,
            distance: sql `${complaintEmbeddings.embedding} <=> ${vectorStr}::vector`,
        })
            .from(complaints)
            .innerJoin(complaintEmbeddings, eq(complaints.id, complaintEmbeddings.complaintId))
            .orderBy(sql `${complaintEmbeddings.embedding} <=> ${vectorStr}::vector`)
            .limit(limit);
        return results;
    },
};
//# sourceMappingURL=complaintEmbeddings.js.map