import {
    pgTable,
    pgEnum,
    serial,
    timestamp,
    integer,
    text,
} from 'drizzle-orm/pg-core';

//const statusEnum = pgEnum('status', ['open', 'paid', 'void', 'uncollectible']);
// Change to receive data ('open', 'paid', 'void', 'uncollectible') dynamically

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
    organizationId: text('organizationId'),
    customerId: integer('customerId')
        .notNull()
        .references(() => Customers.id),
    status: statusEnum('status').notNull(),
});

export const Customers = pgTable('customers', {
    id: serial('id').primaryKey().notNull(),
    createTS: timestamp('createTS').defaultNow().notNull(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    userId: text('userId').notNull(),
    organizationId: text('organizationId'),
});
