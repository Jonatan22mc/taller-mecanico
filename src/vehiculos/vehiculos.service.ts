import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { and, eq, ilike, isNull, SQL } from 'drizzle-orm';
import { DrizzleService } from '../drizzle/drizzle.service';
import { vehiculos } from '../drizzle/Schema/vehiculos';
import { clientes } from '../drizzle/Schema/clientes';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { QueryVehiculoDto } from './dto/query-vehiculo.dto';

@Injectable()
export class VehiculosService {
    constructor(private readonly drizzle: DrizzleService) {}

    async create(createVehiculoDto: CreateVehiculoDto) {
        const db = this.drizzle.getDB();

        const [cliente] = await db
        .select()
        .from(clientes)
        .where(eq(clientes.id, createVehiculoDto.clienteId));

        if (!cliente) {
        throw new NotFoundException(`El cliente con ID ${createVehiculoDto.clienteId} no existe`);
        }

        const [placaExistente] = await db
        .select()
        .from(vehiculos)
        .where(eq(vehiculos.placa, createVehiculoDto.placa));

        if (placaExistente) {
        throw new ConflictException(`Ya existe un vehículo registrado con la placa ${createVehiculoDto.placa}`);
        }

        const [nuevo] = await db.insert(vehiculos).values(createVehiculoDto).returning();
        return nuevo;
    }

    async findAll(query?: QueryVehiculoDto) {
        const db = this.drizzle.getDB();
        const condiciones: SQL[] = [isNull(vehiculos.deletedAt)];

        if (query?.placa) {
        condiciones.push(ilike(vehiculos.placa, `%${query.placa}%`));
        }
        if (query?.marca) {
        condiciones.push(ilike(vehiculos.marca, `%${query.marca}%`));
        }
        if (query?.anio) {
        condiciones.push(eq(vehiculos.anio, query.anio));
        }

        return await db
        .select()
        .from(vehiculos)
        .where(and(...condiciones));
    }

    async findOne(id: string) {
        const db = this.drizzle.getDB();
        const [vehiculo] = await db
        .select()
        .from(vehiculos)
        .where(and(eq(vehiculos.id, id), isNull(vehiculos.deletedAt)));

        if (!vehiculo) {
        throw new NotFoundException(`Vehículo con ID ${id} no encontrado o ha sido eliminado`);
        }

        return vehiculo;
    }

    async update(id: string, updateVehiculoDto: UpdateVehiculoDto) {
        const db = this.drizzle.getDB();
        await this.findOne(id);

        if (updateVehiculoDto.clienteId) {
        const [cliente] = await db
            .select()
            .from(clientes)
            .where(eq(clientes.id, updateVehiculoDto.clienteId));

        if (!cliente) {
            throw new NotFoundException(`El cliente con ID ${updateVehiculoDto.clienteId} no existe`);
        }
        }

        if (updateVehiculoDto.placa) {
        const [placaExistente] = await db
            .select()
            .from(vehiculos)
            .where(eq(vehiculos.placa, updateVehiculoDto.placa));

        if (placaExistente && placaExistente.id !== id) {
            throw new ConflictException(`La placa ${updateVehiculoDto.placa} ya está en uso`);
        }
        }

        const [actualizado] = await db
        .update(vehiculos)
        .set({ ...updateVehiculoDto, updatedAt: new Date() })
        .where(eq(vehiculos.id, id))
        .returning();

        return actualizado;
    }

    async remove(id: string) {
        const db = this.drizzle.getDB();
        await this.findOne(id);

        const [eliminado] = await db
        .update(vehiculos)
        .set({ deletedAt: new Date() })
        .where(eq(vehiculos.id, id))
        .returning();

        return {
        message: `Vehículo con ID ${id} eliminado correctamente (borrado lógico)`,
        vehiculo: eliminado,
        };
    }
}