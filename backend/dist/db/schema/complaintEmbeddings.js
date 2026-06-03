import { pgTable, serial, integer, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { customType } from 'drizzle-orm/pg-core';
import { complaints } from './complaints.js';
const vector = customType({
    dataType() {
        return 'vector(1536)';
    },
    toDriver(value) {
        return `[${value.join(',')}]`;
    },
    fromDriver(value) {
        const str = value;
        return str
            .slice(1, -1)
            .split(',')
            .map(Number);
    },
});
export const complaintEmbeddings = pgTable('complaint_embeddings', {
    id: serial('id').primaryKey(),
    complaintId: integer('complaint_id')
        .notNull()
        .references(() => complaints.id),
    embedding: vector('embedding').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    uniqueIndex('complaint_embeddings_complaint_id_idx').on(table.complaintId),
]);
//# sourceMappingURL=complaintEmbeddings.js.map