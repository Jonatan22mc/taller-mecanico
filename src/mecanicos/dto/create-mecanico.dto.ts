import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMecanicoDto {
    @ApiProperty({ example: 'Carlos Mendoza', description: 'Nombre completo del mecánico' })
    @IsString({ message: 'El nombre completo del mecánico debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre del técnico mecánico es obligatorio' })
    nombre!: string;

    @ApiProperty({ example: 'Motores y Frenos', description: 'Especialidad principal del técnico' })
    @IsString({ message: 'La especialidad debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La especialidad técnica del mecánico es obligatoria (ej. Frenos, Transmisión, Electricidad)' })
    especialidad!: string;

    @ApiProperty({ example: '912345678', description: 'Número de contacto o celular' })
    @IsString({ message: 'El número de teléfono o celular debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El teléfono de contacto del mecánico es obligatorio' })
    telefono!: string;

    @ApiProperty({ example: true, required: false, default: true, description: 'Estado de actividad del mecánico' })
    @IsBoolean({ message: 'El estado de actividad del mecánico debe ser un valor booleano (true o false)' })
    @IsOptional()
    activo?: boolean;
}