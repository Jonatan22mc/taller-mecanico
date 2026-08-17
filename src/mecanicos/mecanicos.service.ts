import { Injectable, NotFoundException } from '@nestjs/common';
import { and, eq, ilike, SQL } from 'drizzle-orm';
import { DrizzleService } from '../drizzle/drizzle.service';
import { mecanicos } from '../drizzle/Schema/mecanicos';
import { CreateMecanicoDto } from './dto/create-mecanico.dto';
import { UpdateMecanicoDto } from './dto/update-mecanico.dto';
import { QueryMecanicoDto } from './dto/query-mecanico.dto';

@Injectable()
export class MecanicosService {
    constructor(private readonly drizzle: DrizzleService) { }

    async create(createMecanicoDto: CreateMecanicoDto) {
        const db = this.drizzle.getDB();
        const [nuevo] = await db.insert(mecanicos).values(createMecanicoDto).returning();
        return nuevo;
    }

    async findAll(query?: QueryMecanicoDto) {
        const db = this.drizzle.getDB();
        const condiciones: SQL[] = [];

        if (query?.nombre) {
            condiciones.push(ilike(mecanicos.nombre, `%${query.nombre}%`));
        }
        if (query?.especialidad) {
            condiciones.push(ilike(mecanicos.especialidad, `%${query.especialidad}%`));
        }
        if (query?.activo !== undefined) {
            condiciones.push(eq(mecanicos.activo, query.activo));
        }

        return db
            .select()
            .from(mecanicos)
            .where(condiciones.length > 0 ? and(...condiciones) : undefined);
    }

    async findOne(id: string) {
        const db = this.drizzle.getDB();
        const [mecanico] = await db.select().from(mecanicos).where(eq(mecanicos.id, id));

        if (!mecanico) {
            throw new NotFoundException(`Técnico mecánico con ID ${id} no encontrado en la plantilla del taller`);
        }

        return mecanico;
    }

    async update(id: string, updateMecanicoDto: UpdateMecanicoDto) {
        const db = this.drizzle.getDB();
        await this.findOne(id);

        const [actualizado] = await db
            .update(mecanicos)
            .set(updateMecanicoDto)
            .where(eq(mecanicos.id, id))
            .returning();

        return actualizado;
    }

    async toggleActivo(id: string) {
        const mecanico = await this.findOne(id);
        const db = this.drizzle.getDB();

        const [actualizado] = await db
            .update(mecanicos)
            .set({ activo: !mecanico.activo })
            .where(eq(mecanicos.id, id))
            .returning();

        return {
            message: `El estado del técnico ${mecanico.nombre} ha sido actualizado a ${actualizado.activo ? 'ACTIVO' : 'INACTIVO'}`,
            mecanico: actualizado,
        };
    }
}