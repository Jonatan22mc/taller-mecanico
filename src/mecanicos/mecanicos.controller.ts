import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MecanicosService } from './mecanicos.service';
import { CreateMecanicoDto } from './dto/create-mecanico.dto';
import { QueryMecanicoDto } from './dto/query-mecanico.dto';

@ApiTags('Mecanicos')
@Controller('mecanicos')
export class MecanicosController {
    constructor(private readonly mecanicosService: MecanicosService) {}

    @Post()
    @ApiOperation({ summary: 'Registrar un nuevo mecánico' })
    @ApiResponse({ status: 201, description: 'Mecánico registrado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
    create(@Body() createMecanicoDto: CreateMecanicoDto) {
        return this.mecanicosService.create(createMecanicoDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar mecánicos con filtros' })
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
}