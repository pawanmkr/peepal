import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Professional } from '../professional/models/professional.model';
import { AuthService } from '../auth/auth.service';

@Module({
    imports: [SequelizeModule.forFeature([User, Professional])],
    controllers: [UserController],
    providers: [UserService, AuthService],
})
export class UserModule {}
