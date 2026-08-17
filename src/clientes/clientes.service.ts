import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { and, eq, ilike, SQL } from 'drizzle-orm';
import { DrizzleService } from '../drizzle/drizzle.service';
import { clientes } from '../drizzle/Schema/clientes';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { QueryClienteDto } from './dto/query-cliente.dto';

@Injectable()
export class ClientesService {
    constructor(private readonly drizzle: DrizzleService) {}

    async create(createClienteDto: CreateClienteDto) {
        const db = this.drizzle.getDB();

        const [existente] = await db
        .select()
        .from(clientes)
        .where(eq(clientes.documento, createClienteDto.documento));

        if (existente) {
        throw new ConflictException(`Ya existe un cliente con el documento ${createClienteDto.documento}`);
        }

        const [nuevo] = await db.insert(clientes).values(createClienteDto).returning();
        return nuevo;
    }

    async findAll(query?: QueryClienteDto) {
        const db = this.drizzle.getDB();
        const condiciones: SQL[] = [];

        if (query?.nombre) {
        condiciones.push(ilike(clientes.nombre, `%${query.nombre}%`));
        }
        if (query?.documento) {
        condiciones.push(eq(clientes.documento, query.documento));
        }

        if (condiciones.length > 0) {
        return await db.select().from(clientes).where(and(...condiciones));
        }

        return await db.select().from(clientes);
    }

    async findOne(id: string) {
        const db = this.drizzle.getDB();
        const [cliente] = await db.select().from(clientes).where(eq(clientes.id, id));

        if (!cliente) {
        throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
        }

        return cliente;
    }
}