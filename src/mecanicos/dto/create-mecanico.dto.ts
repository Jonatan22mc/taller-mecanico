import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMecanicoDto {
    @ApiProperty({ example: 'Carlos Mendoza', description: 'Nombre completo del mecánico' })
    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @ApiProperty({ example: 'Motores y Frenos', description: 'Especialidad principal del técnico' })
    @IsString()
    @IsNotEmpty()
    especialidad!: string;

    @ApiProperty({ example: '912345678', description: 'Número de contacto o celular' })
    @IsString()
    @IsNotEmpty()
    telefono!: string;

    @ApiProperty({ example: true, required: false, default: true, description: 'Estado de actividad del mecánico' })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}