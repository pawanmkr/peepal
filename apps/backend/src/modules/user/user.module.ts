import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Tutor } from '../tutor/models/tutor.model';
import { AuthService } from '../auth/auth.service';

@Module({
    imports: [SequelizeModule.forFeature([User, Tutor])],
    controllers: [UserController],
    providers: [UserService, AuthService],
})
export class UserModule {}
