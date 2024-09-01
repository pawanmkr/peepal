import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Tutor } from '../tutor/models/tutor.model';

@Module({
	imports: [
		SequelizeModule.forFeature([User, Tutor]),
	],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule { }
