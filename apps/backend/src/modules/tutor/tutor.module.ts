import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { TutorController } from './tutor.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FormalEducation } from './models/formal-education.model';
import { Tutor } from './models/tutor.model';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

@Module({
    imports: [SequelizeModule.forFeature([Tutor, FormalEducation, User])],
    controllers: [TutorController],
    providers: [TutorService, UserService],
})
export class TutorModule {}
