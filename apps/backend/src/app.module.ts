import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { env } from './config/env.config';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './middewares/http-logger.middleware';
import { SlotModule } from './modules/slot/slot.module';
import { SessionModule } from './modules/session/session.module';
import { AuthModule } from './modules/auth/auth.module';
import { Cache } from './common/redis.cache';
import { ReviewModule } from './modules/review/review.module';
import { ChatModule } from './modules/chat/chat.module';
import { ChatGateway } from './modules/chat/chat.gateway';

// // Workaround for dynamic import
async function getChalk(): Promise<typeof chalk> {
    const module = await (eval(`import('chalk')`) as Promise<any>);
    return module.default;
}

@Module({
    imports: [
        SequelizeModule.forRootAsync({
            useFactory: () => ({
                dialect: 'postgres',
                host: env.DB_HOST,
                username: env.DB_USER,
                password: env.DB_PASSWORD,
                database: env.DB_NAME,
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false,
                    },
                },
                models: [],
                pool: {
                    max: 64,
                    min: 0,
                    acquire: 30000,
                    idle: 10000,
                },
                define: {
                    underscored: true,
                    timestamps: true,
                    freezeTableName: true,
                    deletedAt: true,
                    paranoid: true,
                },
                logQueryParameters: true,
                benchmark: true,
                logging: true,
                autoLoadModels: true,
                synchronize: true, // WARNING: Don't make it true in production
                retryAttempts: 0,
                retryDelay: 10000,
            }),
        }),
        AuthModule,
        UserModule,
        SlotModule,
        SessionModule,
        ReviewModule,
        ChatModule,
    ],
    controllers: [AppController],
    providers: [Cache],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
