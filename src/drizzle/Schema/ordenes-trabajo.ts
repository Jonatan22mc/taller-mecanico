import { pgTable, uuid, varchar, text, numeric, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { vehiculos } from './vehiculos';
import { mecanicos } from './mecanicos';

export const ordenesTrabajo = pgTable('ordenes_trabajo', {
    id: uuid('id').defaultRandom().primaryKey(),
    vehiculoId: uuid('vehiculo_id')
        .notNull()
        .references(() => vehiculos.id, { onDelete: 'restrict' }),
    mecanicoId: uuid('mecanico_id')
        .notNull()
        .references(() => mecanicos.id, { onDelete: 'restrict' }),
    tipoServicio: varchar('tipo_servicio', { length: 100 }).notNull(),
    descripcion: text('descripcion').notNull(),
    costo: numeric('costo', { precision: 10, scale: 2 }).notNull(),
    kilometraje: integer('kilometraje').notNull(),
    estado: varchar('estado', { length: 30 }).default('PENDIENTE').notNull(),
    fechaIngreso: timestamp('fecha_ingreso').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
    });

    export const ordenesTrabajoRelations = relations(ordenesTrabajo, ({ one }) => ({
    vehiculo: one(vehiculos, {
        fields: [ordenesTrabajo.vehiculoId],
        references: [vehiculos.id],
    }),
    mecanico: one(mecanicos, {
        fields: [ordenesTrabajo.mecanicoId],
        references: [mecanicos.id],
    }),
}));

export type OrdenTrabajo = typeof ordenesTrabajo.$inferSelect;
export type NuevaOrdenTrabajo = typeof ordenesTrabajo.$inferInsert;