import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true, // Elimina automáticamente las propiedades que no están definidas en los DTO antes de llegar al manejador de rutas.
      forbidNonWhitelisted: true // Lanza una excepción si el objeto entrante contiene propiedades que no están definidas en los DTO.
    }
  ));
  
  
  await app.listen(process.env.NODE_PORT);
}
bootstrap();
