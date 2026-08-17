import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { vehiculos } from './vehiculos';

export const clientes = pgTable('clientes', {
    id: uuid('id').defaultRandom().primaryKey(),
    nombre: varchar('nombre', { length: 150 }).notNull(),
    documento: varchar('documento', { length: 20 }).notNull().unique(),
    telefono: varchar('telefono', { length: 20 }).notNull(),
    email: varchar('email', { length: 150 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const clientesRelations = relations(clientes, ({ many }) => ({
    vehiculos: many(vehiculos),
}));

export type Cliente = typeof clientes.$inferSelect;
export type NuevoCliente = typeof clientes.$inferInsert;