import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class QueryMecanicoDto {
    @ApiPropertyOptional({ example: 'Carlos', description: 'Buscar mecánico por nombre' })
    @IsString({ message: 'El término de búsqueda por nombre debe ser texto' })
    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    nombre?: string;

    @ApiPropertyOptional({ example: 'Frenos', description: 'Filtrar por especialidad' })
    @IsString({ message: 'El filtro por especialidad técnica debe ser texto' })
    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    especialidad?: string;

    @ApiPropertyOptional({ example: true, description: 'Filtrar por mecánicos activos' })
    @IsBoolean({ message: 'El filtro de estado activo debe ser un valor booleano (true o false)' })
    @IsOptional()
    @Transform(({ value }) => (value === 'true' || value === true ? true : value === 'false' || value === false ? false : undefined))
    activo?: boolean;
}