import {
    pgTable,
    pgEnum,
    serial,
    timestamp,
    integer,
    text,
} from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', [
    'open',
    'paid',
    'void',
    'uncollectible',
]);

export const Invoices = pgTable('invoices', {
    id: serial('id').primaryKey().notNull(),
    createTS: timestamp('createTS').defaultNow().notNull(),
    value: integer('value').notNull(),
    description: text('description').notNull(),
    status: statusEnum('status').notNull(),
});
