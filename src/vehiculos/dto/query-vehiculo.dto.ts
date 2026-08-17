import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class QueryVehiculoDto {
    @ApiPropertyOptional({ example: 'AFK', description: 'Filtrar por coincidencia en la placa' })
    @IsString()
    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    placa?: string;

    @ApiPropertyOptional({ example: 'Toyota', description: 'Filtrar por marca' })
    @IsString()
    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    marca?: string;

    @ApiPropertyOptional({ example: 2022, description: 'Filtrar por año de fabricación' })
    @IsInt()
    @Min(1980)
    @IsOptional()
    @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
    anio?: number;
}