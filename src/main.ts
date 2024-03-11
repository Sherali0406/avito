import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('task2')
      .setDescription(' Task2!')
      .setVersion('1.0.0')
      .addTag('NodeJs')
      .addBearerAuth()
      .build();

    const PORT = process.env.PORT || 3333;

    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    app.enableCors({ origin: 'http://localhost:5173', credentials: true });
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
