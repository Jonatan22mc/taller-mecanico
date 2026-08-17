import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { and, eq, ilike, isNull, or, SQL } from 'drizzle-orm';
import { DrizzleService } from '../drizzle/drizzle.service';
import { ordenesTrabajo } from '../drizzle/Schema/ordenes-trabajo';
import { vehiculos } from '../drizzle/Schema/vehiculos';
import { mecanicos } from '../drizzle/Schema/mecanicos';
import { CreateOrdenTrabajoDto } from './dto/create-orden-trabajo.dto';
import { UpdateOrdenTrabajoDto } from './dto/update-orden-trabajo.dto';
import { QueryOrdenTrabajoDto } from './dto/query-orden-trabajo.dto';

@Injectable()
export class OrdenesTrabajoService {
    constructor(private readonly drizzle: DrizzleService) { }

    async create(createDto: CreateOrdenTrabajoDto) {
        const db = this.drizzle.getDB();

        const [vehiculo] = await db
            .select()
            .from(vehiculos)
            .where(and(eq(vehiculos.id, createDto.vehiculoId), isNull(vehiculos.deletedAt)));

        if (!vehiculo) {
            throw new NotFoundException(`El vehículo con ID ${createDto.vehiculoId} no existe o fue dado de baja`);
        }

        const [mecanico] = await db
            .select()
            .from(mecanicos)
            .where(eq(mecanicos.id, createDto.mecanicoId));

        if (!mecanico) {
            throw new NotFoundException(`El técnico mecánico con ID ${createDto.mecanicoId} no existe en el sistema`);
        }

        if (!mecanico.activo) {
            throw new ConflictException(
                `Conflicto operativo: No es posible asignar la orden porque el técnico ${mecanico.nombre} se encuentra INACTIVO`,
            );
        }

        const [nuevaOrden] = await db
            .insert(ordenesTrabajo)
            .values({
                ...createDto,
                costo: createDto.costo.toString(),
            })
            .returning();

        return nuevaOrden;
    }

    async findAll(query?: QueryOrdenTrabajoDto) {
        const db = this.drizzle.getDB();
        const condiciones: SQL[] = [isNull(ordenesTrabajo.deletedAt)];

        if (query?.vehiculoId) {
            condiciones.push(eq(ordenesTrabajo.vehiculoId, query.vehiculoId));
        }
        if (query?.estado) {
            condiciones.push(eq(ordenesTrabajo.estado, query.estado));
        }
        if (query?.buscar) {
            condiciones.push(
                or(
                    ilike(ordenesTrabajo.tipoServicio, `%${query.buscar}%`),
                    ilike(ordenesTrabajo.descripcion, `%${query.buscar}%`),
                )!,
            );
        }

        return db
            .select()
            .from(ordenesTrabajo)
            .where(and(...condiciones));
    }

    async findOne(id: string) {
        const db = this.drizzle.getDB();
        const [orden] = await db
            .select()
            .from(ordenesTrabajo)
            .where(and(eq(ordenesTrabajo.id, id), isNull(ordenesTrabajo.deletedAt)));

        if (!orden) {
            throw new NotFoundException(`Orden de trabajo con ID ${id} no encontrada o archivada`);
        }

        return orden;
    }

    async update(id: string, updateDto: UpdateOrdenTrabajoDto) {
        const db = this.drizzle.getDB();
        await this.findOne(id);

        if (updateDto.vehiculoId) {
            const [vehiculo] = await db
                .select()
                .from(vehiculos)
                .where(and(eq(vehiculos.id, updateDto.vehiculoId), isNull(vehiculos.deletedAt)));

            if (!vehiculo) {
                throw new NotFoundException(`El vehículo con ID ${updateDto.vehiculoId} no existe o fue dado de baja`);
            }
        }

        if (updateDto.mecanicoId) {
            const [mecanico] = await db
                .select()
                .from(mecanicos)
                .where(eq(mecanicos.id, updateDto.mecanicoId));

            if (!mecanico) {
                throw new NotFoundException(`El técnico mecánico con ID ${updateDto.mecanicoId} no existe`);
            }

            if (!mecanico.activo) {
                throw new ConflictException(
                    `Conflicto operativo: No es posible reasignar la orden al técnico ${mecanico.nombre} porque está INACTIVO`,
                );
            }
        }

        const payload: Record<string, any> = {
            ...updateDto,
            updatedAt: new Date(),
        };

        if (updateDto.costo !== undefined) {
            payload.costo = updateDto.costo.toString();
        }

        const [actualizado] = await db
            .update(ordenesTrabajo)
            .set(payload)
            .where(and(eq(ordenesTrabajo.id, id), isNull(ordenesTrabajo.deletedAt)))
            .returning();

        return actualizado;
    }

    async remove(id: string) {
        const db = this.drizzle.getDB();
        await this.findOne(id);

        const [eliminado] = await db
            .update(ordenesTrabajo)
            .set({ deletedAt: new Date() })
            .where(eq(ordenesTrabajo.id, id))
            .returning();

        return {
            message: `Orden de trabajo con ID ${id} archivada correctamente (borrado lógico)`,
            ordenTrabajo: eliminado,
        };
    }
}