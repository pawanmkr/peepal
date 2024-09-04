import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Session } from './session.model';
import { Slot } from '../slot/models/slot.model';

@Module({
    imports: [SequelizeModule.forFeature([Session, Slot])],
    controllers: [SessionController],
    providers: [SessionService],
})
export class SessionModule {}
