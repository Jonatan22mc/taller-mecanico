import { pgTable, uuid, varchar, integer, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { clientes } from './clientes';
import { ordenesTrabajo } from './ordenes-trabajo';

export const vehiculos = pgTable(
    'vehiculos',
    {
        id: uuid('id').defaultRandom().primaryKey(),
        placa: varchar('placa', { length: 10 }).notNull(),
        marca: varchar('marca', { length: 50 }).notNull(),
        modelo: varchar('modelo', { length: 50 }).notNull(),
        anio: integer('anio').notNull(),
        color: varchar('color', { length: 30 }).notNull(),
        clienteId: uuid('cliente_id')
            .notNull()
            .references(() => clientes.id, { onDelete: 'restrict' }),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
        deletedAt: timestamp('deleted_at'),
    },
    (table) => [
        uniqueIndex('vehiculos_placa_activa_idx')
            .on(table.placa)
            .where(sql`${table.deletedAt} IS NULL`),
    ],
);