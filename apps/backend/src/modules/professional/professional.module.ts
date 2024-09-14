import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FormalEducation } from './models/formal-education.model';
import { Professional } from './models/professional.model';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { Cache } from '../../common/redis.cache';

@Module({
    imports: [SequelizeModule.forFeature([Professional, FormalEducation, User])],
    controllers: [ProfessionalController],
    providers: [ProfessionalService, UserService, Cache],
})
export class ProfessionalModule {}
