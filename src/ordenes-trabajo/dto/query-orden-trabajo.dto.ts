import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString, IsUUID } from 'class-validator';

export class QueryOrdenTrabajoDto {
    @ApiPropertyOptional({ example: 'b1a2c3d4-0000-0000-0000-000000000000', description: 'Filtrar historial por ID del vehículo' })
    @IsUUID('all', { message: 'El vehiculoId de búsqueda debe ser un UUID válido' })
    @IsOptional()
    vehiculoId?: string;

    @ApiPropertyOptional({ example: 'EN_PROCESO', enum: ['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'], description: 'Filtrar por estado' })
    @IsIn(['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'], { message: 'El estado a filtrar debe ser PENDIENTE, EN_PROCESO o COMPLETADO' })
    @IsOptional()
    estado?: string;

    @ApiPropertyOptional({ example: 'aceite', description: 'Buscar coincidencia en tipo de servicio o descripción' })
    @IsString({ message: 'El término de búsqueda de servicios debe ser texto' })
    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    buscar?: string;
}