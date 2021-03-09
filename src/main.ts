import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Bilrebus')
    .setDescription('Bilrebus API')
    .setVersion('1.0')
    .addTag('bilrebus')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./src/generated/api.json', JSON.stringify(document));
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
