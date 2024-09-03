import { Module } from '@nestjs/common';
import { SlotController } from './slot.controller';
import { SlotService } from './slot.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Slot } from './models/slot.model';

@Module({
    imports: [SequelizeModule.forFeature([Slot])],
    controllers: [SlotController],
    providers: [SlotService],
})
export class SlotModule {}
