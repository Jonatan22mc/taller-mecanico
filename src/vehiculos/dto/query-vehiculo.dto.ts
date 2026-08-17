import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class QueryVehiculoDto {
    @ApiPropertyOptional({ example: 'AFK', description: 'Filtrar por coincidencia en la placa' })
    @IsString({ message: 'El filtro por placa vehicular debe ser texto' })
    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    placa?: string;

    @ApiPropertyOptional({ example: 'Toyota', description: 'Filtrar por marca' })
    @IsString({ message: 'El filtro por marca debe ser texto' })
    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    marca?: string;

    @ApiPropertyOptional({ example: 2022, description: 'Filtrar por año de fabricación' })
    @IsInt({ message: 'El filtro por año de fabricación debe ser un número entero' })
    @Min(1980, { message: 'El año mínimo de búsqueda para vehículos es 1980' })
    @IsOptional()
    @Transform(({ value }) => (value !== undefined && value !== '' ? Number(value) : undefined))
    anio?: number;
}