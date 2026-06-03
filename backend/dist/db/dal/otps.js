import { eq, and, desc } from 'drizzle-orm';
import { db } from '../drizzle.js';
import { otps } from '../schema/otps.js';
export const otpsDAL = {
    async create(data) {
        const result = await db.insert(otps).values(data).returning();
        return result[0];
    },
    async findLatestByUserAndPurpose(userId, purpose) {
        const result = await db
            .select()
            .from(otps)
            .where(and(eq(otps.userId, userId), eq(otps.purpose, purpose)))
            .orderBy(desc(otps.createdAt))
            .limit(1);
        return result[0] ?? null;
    },
    async deleteByUserAndPurpose(userId, purpose) {
        await db.delete(otps).where(and(eq(otps.userId, userId), eq(otps.purpose, purpose)));
    },
};
//# sourceMappingURL=otps.js.map