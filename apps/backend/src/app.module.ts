import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { env } from './config/env.config';
import chalk from 'chalk';
import { UserModule } from './modules/user/user.module';

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
				define: {
					underscored: true,
					timestamps: true,
					freezeTableName: true,
					deletedAt: true,
					paranoid: true,
				},
				logQueryParameters: true,
				benchmark: true,
				logging: async (sql, timing) => {
					const chalk = await getChalk();
					console.log(chalk.green(`\nElapsed Time: ${timing}ms`));
					console.log(chalk.dim(sql));
				},
				autoLoadModels: true,
				synchronize: true, // WARNING: Don't make it true in production
				retryAttempts: 3,
				retryDelay: 10000,
			}),
		}),
		UserModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule { }
