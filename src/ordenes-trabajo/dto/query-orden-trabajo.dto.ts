import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString, IsUUID } from 'class-validator';

export class QueryOrdenTrabajoDto {
    @ApiPropertyOptional({ example: 'b1a2c3d4-0000-0000-0000-000000000000', description: 'Filtrar historial por ID del vehículo' })
    @IsUUID('all')
    @IsOptional()
    vehiculoId?: string;

    @ApiPropertyOptional({ example: 'EN_PROCESO', enum: ['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'], description: 'Filtrar por estado' })
    @IsIn(['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'])
    @IsOptional()
    estado?: string;

    @ApiPropertyOptional({ example: 'aceite', description: 'Buscar coincidencia en tipo de servicio o descripción' })
    @IsString()
    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    buscar?: string;
}