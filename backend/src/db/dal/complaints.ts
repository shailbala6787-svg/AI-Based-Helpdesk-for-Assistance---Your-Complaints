import { eq, or, ilike } from 'drizzle-orm';
import { db } from '../drizzle.js';
import { complaints } from '../schema/complaints.js';

export const complaintsDAL = {
  async create(data: {
    userId: number;
    title: string;
    complainantName: string;
    complainantContact: string;
    incidentDatetime: Date;
    incidentPlace: string;
    accusedDetails?: string;
    description: string;
    ipcSections: string[];
    imageUrl: string;
  }) {
    const result = await db.insert(complaints).values(data).returning();
    return result[0];
  },

  async findById(id: number) {
    const result = await db.select().from(complaints).where(eq(complaints.id, id)).limit(1);
    return result[0] ?? null;
  },

  async findByUserId(userId: number) {
    return db.select().from(complaints).where(eq(complaints.userId, userId));
  },

  async findAll() {
    return db.select().from(complaints);
  },

  async update(
    id: number,
    data: Partial<{
      title: string;
      complainantName: string;
      complainantContact: string;
      incidentDatetime: Date;
      incidentPlace: string;
      accusedDetails: string;
      description: string;
      ipcSections: string[];
    }>,
  ) {
    const result = await db
      .update(complaints)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(complaints.id, id))
      .returning();
    return result[0];
  },

  async remove(id: number) {
    await db.delete(complaints).where(eq(complaints.id, id));
  },

  async keywordSearch(query: string) {
    return db
      .select()
      .from(complaints)
      .where(
        or(
          ilike(complaints.title, `%${query}%`),
          ilike(complaints.description, `%${query}%`),
        ),
      );
  },
};
