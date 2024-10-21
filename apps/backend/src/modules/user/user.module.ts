import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { AuthService } from '../auth/auth.service';
import { Cache } from '../../common/redis.cache';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, AuthService, Cache],
})
export class UserModule {}
