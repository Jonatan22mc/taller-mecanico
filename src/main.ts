import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: false,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Taller Mecánico Automotriz')
    .setDescription('Sistema de control y gestión de clientes, vehículos, mecánicos y órdenes de trabajo')
    .setVersion('1.0')
    .addTag('Clientes', 'Gestión de clientes y propietarios de vehículos')
    .addTag('Vehículos', 'Gestión de parque automotor e historial vehicular')
    .addTag('Mecánicos', 'Gestión del personal técnico especializado')
    .addTag('Órdenes de Trabajo', 'Gestión de servicios, diagnósticos y reparaciones')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();