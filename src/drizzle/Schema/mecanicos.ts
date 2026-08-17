import { pgTable, uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { ordenesTrabajo } from './ordenes-trabajo';

export const mecanicos = pgTable('mecanicos', {
    id: uuid('id').defaultRandom().primaryKey(),
    nombre: varchar('nombre', { length: 150 }).notNull(),
    especialidad: varchar('especialidad', { length: 100 }).notNull(),
    telefono: varchar('telefono', { length: 20 }).notNull(),
    activo: boolean('activo').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const mecanicosRelations = relations(mecanicos, ({ many }) => ({
    ordenesTrabajo: many(ordenesTrabajo),
}));

export type Mecanico = typeof mecanicos.$inferSelect;
export type NuevoMecanico = typeof mecanicos.$inferInsert;