import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrdenesTrabajoService } from './ordenes-trabajo.service';
import { CreateOrdenTrabajoDto } from './dto/create-orden-trabajo.dto';
import { UpdateOrdenTrabajoDto } from './dto/update-orden-trabajo.dto';
import { QueryOrdenTrabajoDto } from './dto/query-orden-trabajo.dto';

@ApiTags('Ordenes de Trabajo')
@Controller('ordenes-trabajo')
export class OrdenesTrabajoController {
    constructor(private readonly ordenesTrabajoService: OrdenesTrabajoService) {}

    @Post()
    @ApiOperation({ summary: 'Registrar una orden de trabajo para un vehículo' })
    @ApiResponse({ status: 201, description: 'Orden de trabajo creada exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
    @ApiResponse({ status: 404, description: 'Vehículo o mecánico no encontrado' })
    create(@Body() createOrdenTrabajoDto: CreateOrdenTrabajoDto) {
        return this.ordenesTrabajoService.create(createOrdenTrabajoDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar órdenes de trabajo activas con filtros' })
    @ApiResponse({ status: 200, description: 'Listado de órdenes de trabajo' })
    findAll(@Query() query: QueryOrdenTrabajoDto) {
        return this.ordenesTrabajoService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener el detalle de una orden de trabajo por ID' })
    @ApiResponse({ status: 200, description: 'Orden encontrada' })
    @ApiResponse({ status: 404, description: 'Orden no encontrada o eliminada' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.ordenesTrabajoService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar una orden de trabajo' })
    @ApiResponse({ status: 200, description: 'Orden actualizada exitosamente' })
    @ApiResponse({ status: 404, description: 'Orden, vehículo o mecánico no encontrado' })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateOrdenTrabajoDto: UpdateOrdenTrabajoDto,
    ) {
        return this.ordenesTrabajoService.update(id, updateOrdenTrabajoDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Borrado lógico de una orden de trabajo' })
    @ApiResponse({ status: 200, description: 'Orden eliminada lógicamente' })
    @ApiResponse({ status: 404, description: 'Orden no encontrada' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.ordenesTrabajoService.remove(id);
    }
}