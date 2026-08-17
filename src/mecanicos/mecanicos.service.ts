import { Injectable, NotFoundException } from '@nestjs/common';
import { and, eq, ilike, SQL } from 'drizzle-orm';
import { DrizzleService } from '../drizzle/drizzle.service';
import { mecanicos } from '../drizzle/Schema/mecanicos';
import { CreateMecanicoDto } from './dto/create-mecanico.dto';
import { QueryMecanicoDto } from './dto/query-mecanico.dto';

@Injectable()
export class MecanicosService {
    constructor(private readonly drizzle: DrizzleService) {}

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

        if (condiciones.length > 0) {
        return await db.select().from(mecanicos).where(and(...condiciones));
        }

        return await db.select().from(mecanicos);
    }

    async findOne(id: string) {
        const db = this.drizzle.getDB();
        const [mecanico] = await db.select().from(mecanicos).where(eq(mecanicos.id, id));

        if (!mecanico) {
        throw new NotFoundException(`Mecánico con ID ${id} no encontrado`);
        }

        return mecanico;
    }
}