import { pgTable, serial, integer, varchar, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users.js';

export const otps = pgTable('otps', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  otpHash: varchar('otp_hash', { length: 255 }).notNull(),
  purpose: varchar('purpose', { length: 10 }).notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
