import { pgTable, uuid, varchar, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { clientes } from './clientes';
import { ordenesTrabajo } from './ordenes-trabajo';

export const vehiculos = pgTable('vehiculos', {
    id: uuid('id').defaultRandom().primaryKey(),
    placa: varchar('placa', { length: 10 }).notNull().unique(),
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
    });

    export const vehiculosRelations = relations(vehiculos, ({ one, many }) => ({
    cliente: one(clientes, {
        fields: [vehiculos.clienteId],
        references: [clientes.id],
    }),
    ordenesTrabajo: many(ordenesTrabajo),
}));

export type Vehiculo = typeof vehiculos.$inferSelect;
export type NuevoVehiculo = typeof vehiculos.$inferInsert;