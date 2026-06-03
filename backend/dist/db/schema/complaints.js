import { pgTable, serial, integer, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users.js';
export const complaints = pgTable('complaints', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    title: varchar('title', { length: 12 }).notNull(),
    complainantName: varchar('complainant_name', { length: 255 }).notNull(),
    complainantContact: text('complainant_contact').notNull(),
    incidentDatetime: timestamp('incident_datetime', { withTimezone: true }).notNull(),
    incidentPlace: varchar('incident_place', { length: 255 }).notNull(),
    accusedDetails: text('accused_details'),
    description: text('description').notNull(),
    ipcSections: text('ipc_sections').array().notNull(),
    imageUrl: varchar('image_url', { length: 500 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
//# sourceMappingURL=complaints.js.map