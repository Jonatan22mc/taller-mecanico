import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Min } from 'class-validator';

export class CreateOrdenTrabajoDto {
    @ApiProperty({ example: 'b1a2c3d4-0000-0000-0000-000000000000', description: 'ID del vehículo asociado' })
    @IsUUID('all', { message: 'El vehiculoId debe ser un identificador UUID válido' })
    @IsNotEmpty({ message: 'El vehiculoId es obligatorio para registrar la orden' })
    vehiculoId!: string;

    @ApiProperty({ example: 'a1b2c3d4-0000-0000-0000-000000000000', description: 'ID del mecánico asignado' })
    @IsUUID('all', { message: 'El mecanicoId debe ser un identificador UUID válido' })
    @IsNotEmpty({ message: 'El mecanicoId es obligatorio para asignar al técnico responsable' })
    mecanicoId!: string;

    @ApiProperty({ example: 'Mantenimiento Preventivo', description: 'Tipo de servicio o trabajo' })
    @IsString({ message: 'El tipo de servicio debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El tipo de servicio es obligatorio' })
    tipoServicio!: string;

    @ApiProperty({ example: 'Cambio de pastillas de frenos y purgado de líquido', description: 'Descripción detallada' })
    @IsString({ message: 'La descripción del servicio debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La descripción del trabajo es obligatoria' })
    descripcion!: string;

    @ApiProperty({ example: 250.00, description: 'Costo total del servicio' })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El costo debe ser un valor numérico válido con hasta 2 decimales' })
    @IsPositive({ message: 'El costo del servicio debe ser un número positivo mayor a 0' })
    @IsNotEmpty({ message: 'El costo del servicio es obligatorio' })
    costo!: number;

    @ApiProperty({ example: 45000, description: 'Kilometraje registrado del auto al ingresar' })
    @IsInt({ message: 'El kilometraje debe ser un número entero' })
    @Min(0, { message: 'El kilometraje no puede ser menor a 0' })
    @IsNotEmpty({ message: 'El kilometraje del vehículo al ingreso es obligatorio' })
    kilometraje!: number;

    @ApiProperty({ example: 'EN_PROCESO', enum: ['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'], required: false, default: 'PENDIENTE' })
    @IsIn(['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'], { message: 'El estado debe ser PENDIENTE, EN_PROCESO o COMPLETADO' })
    @IsOptional()
    estado?: string;
}