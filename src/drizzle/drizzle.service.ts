import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './Schema';

export type AppDatabase = NodePgDatabase<typeof schema>;

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
    private pool!: Pool;
    public db!: AppDatabase;
    private readonly logger = new Logger(DrizzleService.name);

    async onModuleInit() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 5000,
        });

        try {
            this.db = drizzle(this.pool, { schema });
            this.logger.log('Conexión del taller mecánico establecida exitosamente');
        } catch (error) {
            this.logger.error('Fallo al conectar con la base de datos del taller mecánico', error);
            throw error;
        }
    }

    async onModuleDestroy() {
        if (this.pool) {
            await this.pool.end();
            this.logger.log('Conexión con la base de datos cerrada correctamente');
        }
    }

    getDB(): AppDatabase {
        return this.db;
    }
}