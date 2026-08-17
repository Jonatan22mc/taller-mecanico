import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Min } from 'class-validator';

export class CreateOrdenTrabajoDto {
    @ApiProperty({ example: 'b1a2c3d4-0000-0000-0000-000000000000', description: 'ID del vehículo asociado' })
    @IsUUID('all')
    @IsNotEmpty()
    vehiculoId!: string;

    @ApiProperty({ example: 'a1b2c3d4-0000-0000-0000-000000000000', description: 'ID del mecánico asignado' })
    @IsUUID('all')
    @IsNotEmpty()
    mecanicoId!: string;

    @ApiProperty({ example: 'Mantenimiento Preventivo', description: 'Tipo de servicio o trabajo' })
    @IsString()
    @IsNotEmpty()
    tipoServicio!: string;

    @ApiProperty({ example: 'Cambio de aceite, filtro de aire y pastillas de freno', description: 'Descripción detallada del trabajo realizado' })
    @IsString()
    @IsNotEmpty()
    descripcion!: string;

    @ApiProperty({ example: 380.50, description: 'Costo total del servicio' })
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @IsNotEmpty()
    costo!: number;

    @ApiProperty({ example: 45000, description: 'Kilometraje registrado del auto al ingresar' })
    @IsInt()
    @Min(0)
    @IsNotEmpty()
    kilometraje!: number;

    @ApiProperty({ example: 'PENDIENTE', enum: ['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'], required: false, default: 'PENDIENTE' })
    @IsIn(['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'])
    @IsOptional()
    estado?: string;
}