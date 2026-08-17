import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación global estricta con traducción de mensajes de sistema
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formatError = (error: any): string[] => {
          const messages: string[] = [];

          if (error.constraints) {
            for (const key of Object.keys(error.constraints)) {
              let msg = error.constraints[key];
              // Traducir mensajes automáticos de campos no permitidos (forbidNonWhitelisted)
              if (msg.includes('should not exist')) {
                msg = `La propiedad '${error.property}' no está permitida en este formulario`;
              }
              messages.push(msg);
            }
          }

          if (error.children && error.children.length > 0) {
            for (const child of error.children) {
              messages.push(...formatError(child));
            }
          }

          return messages;
        };

        const resultMessages = errors.flatMap((err) => formatError(err));
        return new BadRequestException(resultMessages);
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Taller Mecánico')
    .setDescription('Sistema de gestión de vehículos, clientes, mecánicos y órdenes de trabajo')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();