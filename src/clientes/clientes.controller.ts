import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';

@ApiTags('Clientes')
@Controller('clientes')
export class ClientesController {
    constructor(private readonly clientesService: ClientesService) {}

    @Post()
    @ApiOperation({ summary: 'Registrar un nuevo cliente' })
    @ApiResponse({ status: 201, description: 'Cliente creado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
    @ApiResponse({ status: 409, description: 'El documento del cliente ya existe' })
    create(@Body() createClienteDto: CreateClienteDto) {
        return this.clientesService.create(createClienteDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos los clientes' })
    @ApiResponse({ status: 200, description: 'Listado de clientes obtenido con éxito' })
    findAll() {
        return this.clientesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un cliente por su ID' })
    @ApiResponse({ status: 200, description: 'Cliente encontrado' })
    @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.clientesService.findOne(id);
    }
}