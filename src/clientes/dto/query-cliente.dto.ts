import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class QueryClienteDto {
    @ApiPropertyOptional({ example: 'Alejandro', description: 'Buscar por nombre o coincidencia parcial' })
    @IsString({ message: 'El filtro de búsqueda por nombre debe ser una cadena de texto' })
    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    nombre?: string;

    @ApiPropertyOptional({ example: '45879632', description: 'Filtrar por documento de identidad' })
    @IsString({ message: 'El filtro por documento de identidad debe ser una cadena de texto' })
    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    documento?: string;
}