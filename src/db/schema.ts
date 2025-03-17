import {
    pgTable,
    pgEnum,
    serial,
    timestamp,
    integer,
    text,
} from 'drizzle-orm/pg-core';

import { AVAILABLE_STATISES } from '@/data/invoices';
export type Status = (typeof AVAILABLE_STATISES)[number]['id'];
const statuses = AVAILABLE_STATISES.map(({ id }) => id) as Array<Status>;

export const statusEnum = pgEnum(
    'status',
    statuses as [Status, ...Array<Status>]
);

export const Invoices = pgTable('invoices', {
    id: serial('id').primaryKey().notNull(),
    createTS: timestamp('createTS').defaultNow().notNull(),
    value: integer('value').notNull(),
    description: text('description').notNull(),
    userId: text('userId').notNull(),
    status: statusEnum('status').notNull(),
});
