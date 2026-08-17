import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MecanicosService } from './mecanicos.service';
import { CreateMecanicoDto } from './dto/create-mecanico.dto';
import { UpdateMecanicoDto } from './dto/update-mecanico.dto';
import { QueryMecanicoDto } from './dto/query-mecanico.dto';

@ApiTags('Mecanicos')
@Controller('mecanicos')
export class MecanicosController {
    constructor(private readonly mecanicosService: MecanicosService) { }

    @Post()
    @ApiOperation({ summary: 'Registrar un nuevo mecánico técnico' })
    @ApiResponse({ status: 201, description: 'Mecánico registrado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
    create(@Body() createMecanicoDto: CreateMecanicoDto) {
        return this.mecanicosService.create(createMecanicoDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos los mecánicos con filtros de especialidad y estado' })
    @ApiResponse({ status: 200, description: 'Listado de mecánicos obtenido con éxito' })
    findAll(@Query() query: QueryMecanicoDto) {
        return this.mecanicosService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un mecánico por su ID' })
    @ApiResponse({ status: 200, description: 'Mecánico encontrado' })
    @ApiResponse({ status: 404, description: 'Mecánico no encontrado' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.mecanicosService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar información de un mecánico' })
    @ApiResponse({ status: 200, description: 'Datos del mecánico actualizados exitosamente' })
    @ApiResponse({ status: 404, description: 'Mecánico no encontrado' })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateMecanicoDto: UpdateMecanicoDto,
    ) {
        return this.mecanicosService.update(id, updateMecanicoDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Alternar estado activo/inactivo (desactivación lógica) de un mecánico' })
    @ApiResponse({ status: 200, description: 'Estado del mecánico modificado exitosamente' })
    @ApiResponse({ status: 404, description: 'Mecánico no encontrado' })
    toggleActivo(@Param('id', ParseUUIDPipe) id: string) {
        return this.mecanicosService.toggleActivo(id);
    }
}