import { eq, or, ilike, sql } from 'drizzle-orm';
import { db } from '../drizzle.js';
import { users } from '../schema/users.js';
export const usersDAL = {
    async findByEmail(email) {
        const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
        return result[0] ?? null;
    },
    async findById(id) {
        const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
        return result[0] ?? null;
    },
    async create(data) {
        const result = await db.insert(users).values(data).returning();
        return result[0];
    },
    async updateVerified(id, verified) {
        await db.update(users).set({ verified, updatedAt: new Date() }).where(eq(users.id, id));
    },
    async updatePassword(id, passwordHash) {
        await db.update(users).set({ passwordHash, updatedAt: new Date() }).where(eq(users.id, id));
    },
    async incrementUploadsUsed(id) {
        await db
            .update(users)
            .set({ uploadsUsed: sql `${users.uploadsUsed} + 1`, updatedAt: new Date() })
            .where(eq(users.id, id));
    },
    async incrementSearchesUsed(id) {
        await db
            .update(users)
            .set({ searchesUsed: sql `${users.searchesUsed} + 1`, updatedAt: new Date() })
            .where(eq(users.id, id));
    },
    async updateLimits(id, data) {
        const updates = { updatedAt: new Date() };
        if (data.uploadLimit !== undefined)
            updates.uploadLimit = data.uploadLimit;
        if (data.searchLimit !== undefined)
            updates.searchLimit = data.searchLimit;
        await db.update(users).set(updates).where(eq(users.id, id));
    },
    async searchByQuery(query) {
        return db
            .select()
            .from(users)
            .where(or(ilike(users.email, `%${query}%`), ilike(users.name, `%${query}%`)));
    },
};
//# sourceMappingURL=users.js.map