import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { InjectModel } from '@nestjs/sequelize';
import { v7 as uuidv7 } from 'uuid';
import { Sequelize } from 'sequelize-typescript';

import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './session.model';
import { Slot } from '../slot/models/slot.model';
import { UserRole } from '../../common/common.enum';

@Injectable()
export class SessionService {
    private readonly logger = new Logger(SessionService.name);
    constructor(
        private readonly sequelize: Sequelize,
        @InjectModel(Session)
        private readonly sessionModel: typeof Session,
        @InjectModel(Slot)
        private readonly slotModel: typeof Slot
    ) {}

    create(dto: CreateSessionDto, userId: UUID, professionalId: UUID) {
        this.logger.log('Creating a new session');
        return this.sequelize.transaction(async (transaction) => {
            const slot = await this.slotModel.create(
                {
                    id: uuidv7() as UUID,
                    rule: dto.rule,
                    isAvailable: false,
                    userType: UserRole.USER,
                    userId,
                    professionalId,
                },
                { transaction }
            );
            return await this.sessionModel.create(
                { ...dto, id: uuidv7() as UUID, slotId: slot.id },
                { transaction }
            );
        });
    }

    findAll(professionalId?: UUID, userId?: UUID) {
        return this.sessionModel.findAll({
            where: {
                slot: { userId, professionalId },
            },
        });
    }

    findOne(id: UUID) {
        return this.sessionModel.findByPk(id, { include: [Slot] });
    }

    async update(id: UUID, dto: UpdateSessionDto) {
        const [affectedCount, [row]] = await this.sessionModel.update(dto, {
            where: { id },
            returning: true,
        });
        if (affectedCount === 0) {
            throw new NotFoundException(`Session with ID ${id} not found`);
        }
        return row;
    }

    async remove(id: UUID) {
        const session = await this.sessionModel.findByPk(id);
        if (!session) {
            throw new NotFoundException(`Session with ID ${id} not found`);
        }
        return session.destroy();
    }
}
