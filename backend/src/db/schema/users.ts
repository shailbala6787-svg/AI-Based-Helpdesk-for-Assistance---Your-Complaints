import { pgTable, serial, varchar, boolean, integer, timestamp } from 'drizzle-orm/pg-core';
import { DEFAULT_UPLOAD_LIMIT, DEFAULT_SEARCH_LIMIT } from '../../constants/limits.js';
import { ROLES } from '../../constants/roles.js';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: varchar('role', { length: 10 }).notNull().default(ROLES.USER),
  verified: boolean('verified').notNull().default(false),
  uploadLimit: integer('upload_limit').notNull().default(DEFAULT_UPLOAD_LIMIT),
  searchLimit: integer('search_limit').notNull().default(DEFAULT_SEARCH_LIMIT),
  uploadsUsed: integer('uploads_used').notNull().default(0),
  searchesUsed: integer('searches_used').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
