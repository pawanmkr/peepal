import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';
import { ValidationPipe } from '@nestjs/common';
import * as http from 'http';

import { AppModule } from './app.module';
import { env } from './config/env.config';

async function bootstrap() {
    const globalPrefix = 'api/v1';
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(globalPrefix);
    app.use(
        ['/api/v1/docs'],
        basicAuth({
            users: { admin: 'password' },
            challenge: true,
        })
    );
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('NestJS API')
        .setDescription('API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    // Create Swagger document
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document, {
        useGlobalPrefix: true,
        explorer: true,
    });

    // Increase NestJS timeout (default is 120000 ms)
    const server = app.getHttpServer() as http.Server;
    server.setTimeout(180_000); // Set timeout to 5 minutes

    await app.listen(env.APP_PORT);
    Logger.log(`🚀 Visit docs on: ${await app.getUrl()}/${globalPrefix}/docs`);
}

bootstrap();
