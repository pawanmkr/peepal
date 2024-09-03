import { Injectable, Logger } from '@nestjs/common';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { UUID } from 'node:crypto';
import { InjectModel } from '@nestjs/sequelize';
import { Slot } from './models/slot.model';

@Injectable()
export class SlotService {
    private readonly logger = new Logger(SlotService.name);
    constructor(
        @InjectModel(Slot)
        private readonly slotModel: typeof Slot
    ) {}

    create(dto: CreateSlotDto) {
        return this.slotModel.create({ ...dto } as Slot);
    }

    findAll(offset: number, limit: number) {
        return this.slotModel.findAll({ offset, limit });
    }

    findOne(id: UUID) {
        return this.slotModel.findByPk(id);
    }

    update(id: UUID, dto: UpdateSlotDto) {
        return this.slotModel.update({ ...dto }, { where: { id } });
    }

    remove(id: UUID) {
        return this.slotModel.destroy({ where: { id }, force: true });
    }
}
