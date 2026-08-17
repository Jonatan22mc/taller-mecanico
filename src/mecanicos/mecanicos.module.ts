import { Module } from '@nestjs/common';
import { MecanicosController } from './mecanicos.controller';
import { MecanicosService } from './mecanicos.service';

@Module({
  controllers: [MecanicosController],
  providers: [MecanicosService]
})
export class MecanicosModule {}
