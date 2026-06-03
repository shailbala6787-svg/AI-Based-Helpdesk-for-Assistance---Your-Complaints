import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from '../config/env.js';
import { users } from './schema/users.js';
import { otps } from './schema/otps.js';
import { complaints } from './schema/complaints.js';
import { complaintEmbeddings } from './schema/complaintEmbeddings.js';
const client = postgres(config.databaseUrl);
export const db = drizzle(client, {
    schema: { users, otps, complaints, complaintEmbeddings },
});
//# sourceMappingURL=drizzle.js.map