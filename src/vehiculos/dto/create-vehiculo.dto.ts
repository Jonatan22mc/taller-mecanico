import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateVehiculoDto {
    @ApiProperty({ example: 'AFK-892', description: 'Placa única del vehículo' })
    @IsString({ message: 'La placa vehicular debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La placa vehicular es obligatoria' })
    placa!: string;

    @ApiProperty({ example: 'Toyota', description: 'Marca del auto' })
    @IsString({ message: 'La marca debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La marca del vehículo es obligatoria' })
    marca!: string;

    @ApiProperty({ example: 'Hilux', description: 'Modelo del vehículo' })
    @IsString({ message: 'El modelo debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El modelo del vehículo es obligatorio' })
    modelo!: string;

    @ApiProperty({ example: 2022, description: 'Año de fabricación' })
    @IsInt({ message: 'El año de fabricación debe ser un número entero' })
    @Min(1980, { message: 'El año del vehículo no puede ser menor a 1980' })
    @Max(2030, { message: 'El año del vehículo no puede ser mayor a 2030' })
    @IsNotEmpty({ message: 'El año de fabricación es obligatorio' })
    anio!: number;

    @ApiProperty({ example: 'Gris Plata', description: 'Color del auto' })
    @IsString({ message: 'El color debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El color del vehículo es obligatorio' })
    color!: string;

    @ApiProperty({ example: 'b1a2c3d4-0000-0000-0000-000000000000', description: 'ID (UUID) del cliente propietario' })
    @IsUUID('all', { message: 'El clienteId debe ser un identificador UUID válido' })
    @IsNotEmpty({ message: 'El clienteId es obligatorio para vincular el vehículo a su propietario' })
    clienteId!: string;
}