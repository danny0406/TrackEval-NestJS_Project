import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true, // Elimina automáticamente las propiedades que no están definidas en los DTO antes de llegar al manejador de rutas.
      forbidNonWhitelisted: true // Lanza una excepción si el objeto entrante contiene propiedades que no están definidas en los DTO.
    }
  ));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); // for validation tdo on response In Class Transformer 
  
  
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.NODE_PORT);
}
bootstrap();
