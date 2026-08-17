import { Module } from '@nestjs/common';

import { DrizzleModule } from './drizzle/drizzle.module';
import { ClientesModule } from './clientes/clientes.module';
import { MecanicosModule } from './mecanicos/mecanicos.module';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { OrdenesTrabajoModule } from './ordenes-trabajo/ordenes-trabajo.module';

@Module({
  imports: [DrizzleModule, ClientesModule, MecanicosModule, VehiculosModule, OrdenesTrabajoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}