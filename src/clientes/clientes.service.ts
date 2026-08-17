import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { and, eq, ilike, isNull, SQL } from 'drizzle-orm';
import { DrizzleService } from '../drizzle/drizzle.service';
import { clientes } from '../drizzle/Schema/clientes';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { QueryClienteDto } from './dto/query-cliente.dto';

@Injectable()
export class ClientesService {
    constructor(private readonly drizzle: DrizzleService) { }

    async create(createClienteDto: CreateClienteDto) {
        const db = this.drizzle.getDB();

        const [existente] = await db
            .select()
            .from(clientes)
            .where(and(eq(clientes.documento, createClienteDto.documento), isNull(clientes.deletedAt)));

        if (existente) {
            throw new ConflictException(
                `Conflicto en recepción: Ya existe un cliente activo registrado con el documento de identidad ${createClienteDto.documento}`,
            );
        }

        const [nuevo] = await db.insert(clientes).values(createClienteDto).returning();
        return nuevo;
    }

    async findAll(query?: QueryClienteDto) {
        const db = this.drizzle.getDB();
        const condiciones: SQL[] = [isNull(clientes.deletedAt)];

        if (query?.nombre) {
            condiciones.push(ilike(clientes.nombre, `%${query.nombre}%`));
        }
        if (query?.documento) {
            condiciones.push(eq(clientes.documento, query.documento));
        }

        return db
            .select()
            .from(clientes)
            .where(and(...condiciones));
    }

    async findOne(id: string) {
        const db = this.drizzle.getDB();
        const [cliente] = await db
            .select()
            .from(clientes)
            .where(and(eq(clientes.id, id), isNull(clientes.deletedAt)));

        if (!cliente) {
            throw new NotFoundException(`Cliente con ID ${id} no figura en los registros activos del taller`);
        }

        return cliente;
    }

    async update(id: string, updateDto: UpdateClienteDto) {
        const db = this.drizzle.getDB();
        await this.findOne(id);

        if (updateDto.documento) {
            const [existente] = await db
                .select()
                .from(clientes)
                .where(and(eq(clientes.documento, updateDto.documento), isNull(clientes.deletedAt)));

            if (existente && existente.id !== id) {
                throw new ConflictException(`El documento ${updateDto.documento} ya pertenece a otro cliente activo`);
            }
        }

        const [actualizado] = await db
            .update(clientes)
            .set({ ...updateDto, updatedAt: new Date() })
            .where(and(eq(clientes.id, id), isNull(clientes.deletedAt)))
            .returning();

        return actualizado;
    }

    async remove(id: string) {
        const db = this.drizzle.getDB();
        await this.findOne(id);

        // Borrado lógico con marca de tiempo
        const [eliminado] = await db
            .update(clientes)
            .set({ deletedAt: new Date() })
            .where(eq(clientes.id, id))
            .returning();

        return {
            message: `Cliente con ID ${id} dado de baja correctamente (borrado lógico)`,
            cliente: eliminado,
        };
    }
}