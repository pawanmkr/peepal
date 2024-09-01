import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { env } from './config/env.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const globalPrefix = 'api/v1';
	app.setGlobalPrefix(globalPrefix);

	const config = new DocumentBuilder()
		.setTitle('NestJS API')
		.setDescription('API description')
		.setVersion('1.0')
		.setBasePath(globalPrefix)
		.addTag('nestjs')
		.build();
	// Create Swagger document
	const document = SwaggerModule.createDocument(app, config);
	const swaggerPath = `${globalPrefix}/docs`;
	SwaggerModule.setup(swaggerPath, app, document);

	await app.listen(env.APP_PORT);
	Logger.log(`🚀 Visit docs on: ${env.APP_URL}/${swaggerPath}`);
}

bootstrap();
