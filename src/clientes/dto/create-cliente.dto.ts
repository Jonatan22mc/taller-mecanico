import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateClienteDto {
    @ApiProperty({ example: 'Alejandro Morales', description: 'Nombre completo del cliente' })
    @IsString({ message: 'El nombre completo del cliente debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre del cliente es obligatorio para el registro' })
    nombre!: string;

    @ApiProperty({ example: '45879632', description: 'DNI o RUC único del cliente' })
    @IsString({ message: 'El documento de identidad debe ser una cadena de texto' })
    @Length(8, 20, { message: 'El documento de identidad (DNI o RUC) debe tener entre 8 y 20 caracteres' })
    @IsNotEmpty({ message: 'El documento de identidad es obligatorio' })
    documento!: string;

    @ApiProperty({ example: '987123456', description: 'Número de teléfono o celular' })
    @IsString({ message: 'El número de teléfono o celular debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El teléfono de contacto del cliente es obligatorio' })
    telefono!: string;

    @ApiProperty({ example: 'alejandro.morales@gmail.com', description: 'Correo electrónico' })
    @IsEmail({}, { message: 'El correo electrónico debe tener un formato válido (ej. cliente@taller.com)' })
    @IsNotEmpty({ message: 'El correo electrónico del cliente es obligatorio para el envío de presupuestos y notificaciones' })
    email!: string;
}