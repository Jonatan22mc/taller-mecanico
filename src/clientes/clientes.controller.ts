import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { QueryClienteDto } from './dto/query-cliente.dto';

@ApiTags('Clientes')
@Controller('clientes')
export class ClientesController {
    constructor(private readonly clientesService: ClientesService) { }

    @Post()
    @ApiOperation({ summary: 'Registrar un nuevo cliente en el taller' })
    @ApiResponse({ status: 201, description: 'Cliente registrado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
    @ApiResponse({ status: 409, description: 'Documento de identidad ya registrado' })
    create(@Body() createClienteDto: CreateClienteDto) {
        return this.clientesService.create(createClienteDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos los clientes activos con filtros' })
    @ApiResponse({ status: 200, description: 'Listado de clientes obtenido con éxito' })
    findAll(@Query() query: QueryClienteDto) {
        return this.clientesService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un cliente activo por su ID' })
    @ApiResponse({ status: 200, description: 'Cliente encontrado' })
    @ApiResponse({ status: 404, description: 'Cliente no encontrado o dado de baja' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.clientesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar datos de un cliente' })
    @ApiResponse({ status: 200, description: 'Cliente actualizado exitosamente' })
    @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
    @ApiResponse({ status: 409, description: 'Conflicto por documento duplicado' })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateClienteDto: UpdateClienteDto,
    ) {
        return this.clientesService.update(id, updateClienteDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Dar de baja (borrado lógico) a un cliente' })
    @ApiResponse({ status: 200, description: 'Cliente dado de baja exitosamente' })
    @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.clientesService.remove(id);
    }
}