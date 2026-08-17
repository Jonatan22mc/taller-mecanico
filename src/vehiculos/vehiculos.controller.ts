import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VehiculosService } from './vehiculos.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { QueryVehiculoDto } from './dto/query-vehiculo.dto';

@ApiTags('Vehiculos')
@Controller('vehiculos')
export class VehiculosController {
    constructor(private readonly vehiculosService: VehiculosService) {}

    @Post()
    @ApiOperation({ summary: 'Registrar un vehículo con cliente asociado' })
    @ApiResponse({ status: 201, description: 'Vehículo registrado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
    @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
    @ApiResponse({ status: 409, description: 'Placa duplicada' })
    create(@Body() createVehiculoDto: CreateVehiculoDto) {
        return this.vehiculosService.create(createVehiculoDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos los vehículos activos con filtros de búsqueda' })
    @ApiResponse({ status: 200, description: 'Listado de vehículos' })
    findAll(@Query() query: QueryVehiculoDto) {
        return this.vehiculosService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un vehículo activo por ID' })
    @ApiResponse({ status: 200, description: 'Vehículo encontrado' })
    @ApiResponse({ status: 404, description: 'Vehículo no encontrado o eliminado' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.vehiculosService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar datos de un vehículo' })
    @ApiResponse({ status: 200, description: 'Vehículo actualizado' })
    @ApiResponse({ status: 404, description: 'Vehículo o cliente no encontrado' })
    @ApiResponse({ status: 409, description: 'Placa duplicada' })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateVehiculoDto: UpdateVehiculoDto,
    ) {
        return this.vehiculosService.update(id, updateVehiculoDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Borrado lógico de un vehículo' })
    @ApiResponse({ status: 200, description: 'Vehículo eliminado lógicamente' })
    @ApiResponse({ status: 404, description: 'Vehículo no encontrado' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.vehiculosService.remove(id);
    }
}