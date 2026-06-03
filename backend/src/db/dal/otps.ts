import { eq, and, desc } from 'drizzle-orm';
import { db } from '../drizzle.js';
import { otps } from '../schema/otps.js';
import type { OtpPurpose } from '../../constants/enums.js';

export const otpsDAL = {
  async create(data: {
    userId: number;
    otpHash: string;
    purpose: OtpPurpose;
    expiresAt: Date;
  }) {
    const result = await db.insert(otps).values(data).returning();
    return result[0];
  },

  async findLatestByUserAndPurpose(userId: number, purpose: OtpPurpose) {
    const result = await db
      .select()
      .from(otps)
      .where(and(eq(otps.userId, userId), eq(otps.purpose, purpose)))
      .orderBy(desc(otps.createdAt))
      .limit(1);
    return result[0] ?? null;
  },

  async deleteByUserAndPurpose(userId: number, purpose: OtpPurpose) {
    await db.delete(otps).where(and(eq(otps.userId, userId), eq(otps.purpose, purpose)));
  },
};
