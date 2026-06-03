import { eq, or, ilike } from 'drizzle-orm';
import { db } from '../drizzle.js';
import { complaints } from '../schema/complaints.js';
export const complaintsDAL = {
    async create(data) {
        const result = await db.insert(complaints).values(data).returning();
        return result[0];
    },
    async findById(id) {
        const result = await db.select().from(complaints).where(eq(complaints.id, id)).limit(1);
        return result[0] ?? null;
    },
    async findByUserId(userId) {
        return db.select().from(complaints).where(eq(complaints.userId, userId));
    },
    async findAll() {
        return db.select().from(complaints);
    },
    async update(id, data) {
        const result = await db
            .update(complaints)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(complaints.id, id))
            .returning();
        return result[0];
    },
    async remove(id) {
        await db.delete(complaints).where(eq(complaints.id, id));
    },
    async keywordSearch(query) {
        return db
            .select()
            .from(complaints)
            .where(or(ilike(complaints.title, `%${query}%`), ilike(complaints.description, `%${query}%`)));
    },
};
//# sourceMappingURL=complaints.js.map