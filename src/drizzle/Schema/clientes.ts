import { pgTable, uuid, varchar, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { vehiculos } from './vehiculos';

export const clientes = pgTable(
    'clientes',
    {
        id: uuid('id').defaultRandom().primaryKey(),
        nombre: varchar('nombre', { length: 150 }).notNull(),
        documento: varchar('documento', { length: 20 }).notNull(),
        telefono: varchar('telefono', { length: 20 }).notNull(),
        email: varchar('email', { length: 150 }).notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
        deletedAt: timestamp('deleted_at'),
    },
    (table) => [
        uniqueIndex('clientes_documento_activo_idx')
            .on(table.documento)
            .where(sql`${table.deletedAt} IS NULL`),
    ],
);

export const clientesRelations = relations(clientes, ({ many }) => ({
    vehiculos: many(vehiculos),
}));

export type Cliente = typeof clientes.$inferSelect;
export type NuevoCliente = typeof clientes.$inferInsert;