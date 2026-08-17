import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { QueryClienteDto } from './dto/query-cliente.dto';

@ApiTags('Clientes')
@Controller('clientes')
export class ClientesController {
    constructor(private readonly clientesService: ClientesService) {}

    @Post()
    @ApiOperation({ summary: 'Registrar un nuevo cliente' })
    @ApiResponse({ status: 201, description: 'Cliente registrado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
    @ApiResponse({ status: 409, description: 'Documento duplicado' })
    create(@Body() createClienteDto: CreateClienteDto) {
        return this.clientesService.create(createClienteDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar clientes con filtros' })
    @ApiResponse({ status: 200, description: 'Listado de clientes obtenido con éxito' })
    findAll(@Query() query: QueryClienteDto) {
        return this.clientesService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un cliente por su ID' })
    @ApiResponse({ status: 200, description: 'Cliente encontrado' })
    @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.clientesService.findOne(id);
    }
}