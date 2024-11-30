import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';
import { ValidationPipe } from '@nestjs/common';
import * as http from 'http';
import * as WebSocket from 'ws';

import { AppModule } from './app.module';
import { env } from './config/env.config';

async function bootstrap() {
    const globalPrefix = 'api/v1';
    const app = await NestFactory.create(AppModule);

    // Set global prefix for APIs
    app.setGlobalPrefix(globalPrefix);

    // Basic Authentication for Swagger Docs
    app.use(
        ['/api/v1/docs'],
        basicAuth({
            users: { admin: 'password' },
            challenge: true,
        }),
    );

    // Validation pipe
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();

    // Swagger Configuration
    const config = new DocumentBuilder()
        .setTitle('NestJS API')
        .setDescription('API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document, {
        useGlobalPrefix: true,
        explorer: true,
    });

    // Start HTTP server
    const httpServer = app.getHttpServer() as http.Server;
    httpServer.setTimeout(180_000); // Increase timeout to 5 minutes
    await app.listen(env.APP_PORT);
    Logger.log(`🚀 HTTP Server running on: ${await app.getUrl()}`);
    Logger.log(`🚀 Swagger Docs available at: ${await app.getUrl()}/${globalPrefix}/docs`);

    // WebSocket Server Initialization (using the same port 3000)
    const wss = new WebSocket.Server({ server: httpServer });

    // WebSocket event handlers
    wss.on('connection', (ws) => {
        Logger.log(`New WebSocket connection established`);

        // Listen for messages from WebSocket clients
        ws.on('message', (message) => {
            Logger.log(`Received WebSocket message: ${message}`);
            ws.send(`Server received: ${message}`);
        });

        // Handle WebSocket disconnection
        ws.on('close', () => {
            Logger.log('WebSocket connection closed');
        });

        // Send initial message to WebSocket client upon connection
        ws.send('Welcome to the WebSocket server!');
    });

    Logger.log(`🚀 WebSocket Server integrated with HTTP server on port ${env.APP_PORT}`);
}

bootstrap();
    