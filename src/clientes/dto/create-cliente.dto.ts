import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateClienteDto {
    @ApiProperty({ example: 'Alejandro Morales', description: 'Nombre completo del cliente' })
    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @ApiProperty({ example: '45879632', description: 'DNI o RUC único del cliente' })
    @IsString()
    @Length(8, 20)
    @IsNotEmpty()
    documento!: string;

    @ApiProperty({ example: '987123456', description: 'Número de teléfono o celular' })
    @IsString()
    @IsNotEmpty()
    telefono!: string;

    @ApiProperty({ example: 'alejandro.morales@gmail.com', description: 'Correo electrónico' })
    @IsEmail()
    @IsNotEmpty()
    email!: string;
}