import { Global, Module } from '@nestjs/common';
import { DrizzleService } from './drizzle.service';
import { DrizzleController } from './drizzle.controller';

@Global()
@Module({
    controllers: [DrizzleController],
    providers: [DrizzleService],
    exports: [DrizzleService],
})
export class DrizzleModule {}