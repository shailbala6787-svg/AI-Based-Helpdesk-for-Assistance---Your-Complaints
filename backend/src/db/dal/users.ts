import { eq, or, ilike, sql } from 'drizzle-orm';
import { db } from '../drizzle.js';
import { users } from '../schema/users.js';

export const usersDAL = {
  async findByEmail(email: string) {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0] ?? null;
  },

  async findById(id: number) {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0] ?? null;
  },

  async create(data: {
    name: string;
    email: string;
    passwordHash: string;
  }) {
    const result = await db.insert(users).values(data).returning();
    return result[0];
  },

  async updateVerified(id: number, verified: boolean) {
    await db.update(users).set({ verified, updatedAt: new Date() }).where(eq(users.id, id));
  },

  async updatePassword(id: number, passwordHash: string) {
    await db.update(users).set({ passwordHash, updatedAt: new Date() }).where(eq(users.id, id));
  },

  async incrementUploadsUsed(id: number) {
    await db
      .update(users)
      .set({ uploadsUsed: sql`${users.uploadsUsed} + 1`, updatedAt: new Date() })
      .where(eq(users.id, id));
  },

  async incrementSearchesUsed(id: number) {
    await db
      .update(users)
      .set({ searchesUsed: sql`${users.searchesUsed} + 1`, updatedAt: new Date() })
      .where(eq(users.id, id));
  },

  async updateLimits(id: number, data: { uploadLimit?: number; searchLimit?: number }) {
    const updates: Record<string, unknown> = { updatedAt: new Date() };
    if (data.uploadLimit !== undefined) updates.uploadLimit = data.uploadLimit;
    if (data.searchLimit !== undefined) updates.searchLimit = data.searchLimit;
    await db.update(users).set(updates).where(eq(users.id, id));
  },

  async searchByQuery(query: string) {
    return db
      .select()
      .from(users)
      .where(or(ilike(users.email, `%${query}%`), ilike(users.name, `%${query}%`)));
  },
};
