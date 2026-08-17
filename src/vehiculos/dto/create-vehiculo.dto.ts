import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateVehiculoDto {
    @ApiProperty({ example: 'AFK-892', description: 'Placa única del vehículo' })
    @IsString()
    @IsNotEmpty()
    placa!: string;

    @ApiProperty({ example: 'Toyota', description: 'Marca del auto' })
    @IsString()
    @IsNotEmpty()
    marca!: string;

    @ApiProperty({ example: 'Hilux', description: 'Modelo del vehículo' })
    @IsString()
    @IsNotEmpty()
    modelo!: string;

    @ApiProperty({ example: 2022, description: 'Año de fabricación' })
    @IsInt()
    @Min(1980)
    @Max(2030)
    anio!: number;

    @ApiProperty({ example: 'Gris Plata', description: 'Color del auto' })
    @IsString()
    @IsNotEmpty()
    color!: string;

    @ApiProperty({ example: 'b1a2c3d4-0000-0000-0000-000000000000', description: 'ID (UUID) del cliente propietario' })
    @IsUUID('all')
    @IsNotEmpty()
    clienteId!: string;
}