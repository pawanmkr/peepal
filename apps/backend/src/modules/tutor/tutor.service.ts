import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UUID } from 'crypto';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { v7 as uuidv7 } from 'uuid';

import { Tutor } from './models/tutor.model';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { FormalEducation } from './models/formal-education.model';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

@Injectable()
export class TutorService {
    private readonly queryConfig = {
        include: [
            {
                model: FormalEducation,
                attributes: { exclude: ['tutorId', 'createdAt', 'updatedAt', 'deletedAt'] },
            },
            {
                model: User,
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
        ],
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt', 'deletedAt'] },
    };
    private readonly logger = new Logger(TutorService.name);
    constructor(
        @InjectModel(Tutor)
        private readonly tutorModel: typeof Tutor,
        @InjectModel(FormalEducation)
        private readonly formalEducationModel: typeof FormalEducation,
        private readonly sequelize: Sequelize,
        private readonly userService: UserService
    ) {}

    async create(dto: CreateTutorDto, userId: UUID) {
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new NotFoundException(`User with id: ${userId} not found`);
        }
        this.logger.debug(`Creating tutor for user with id: ${userId}`);
        return this.sequelize.transaction(async (t) => {
            const tutor = await this.tutorModel.create(
                {
                    id: uuidv7(),
                    ...dto,
                    userId,
                } as Tutor,
                { transaction: t }
            );
            this.logger.debug(`Created tutor with id: ${tutor.id}`);
            tutor.formalEducation = await this.formalEducationModel.bulkCreate(
                dto.formalEducation.map((education) => ({
                    ...education,
                    id: uuidv7() as UUID,
                    tutorId: tutor.id as UUID,
                })),
                { transaction: t }
            );
            this.logger.debug(
                `Created ${tutor.formalEducation.length} formal education records for tutor with id: ${tutor.id}`
            );
            return await this.findOne(tutor.id as UUID);
        });
    }

    findAll(offset: number, limit: number) {
        return this.tutorModel.findAll({ ...this.queryConfig, offset, limit });
    }

    findOne(id: UUID): Promise<Tutor | null> {
        return this.tutorModel.findByPk(id, this.queryConfig);
    }

    async update(id: UUID, dto: UpdateTutorDto) {
        const tutor = await this.findOne(id);
        if (!tutor) {
            throw new NotFoundException(`Tutor with id: ${id} not found`);
        }
        this.logger.debug(`Updating tutor with id: ${tutor.id}`);
        // Use a transaction to ensure that all operations are atomic
        await this.sequelize.transaction(async (transaction) => {
            // Automatically assign all fields from the DTO to the tutor model
            Object.assign(tutor, dto);
            await tutor.update({ ...dto } as Tutor, { transaction });
            this.logger.debug(`Updated tutor with id: ${tutor.id}`);
            // Delete all formal education records associated with the tutor and create new ones
            if (dto.formalEducation && dto.formalEducation.length > 0) {
                this.logger.debug(
                    `Found ${dto.formalEducation.length} formal education records for tutor with id: ${tutor.id}`
                );
                await this.formalEducationModel.destroy({
                    where: {
                        tutorId: tutor.id,
                    },
                    force: true,
                    transaction,
                });
                this.logger.debug(
                    `Deleted all formal education records for tutor with id: ${tutor.id}`
                );
                tutor.formalEducation = await this.formalEducationModel.bulkCreate(
                    dto.formalEducation.map((education) => ({
                        id: uuidv7() as UUID,
                        ...education,
                        tutorId: tutor.id as UUID,
                    })),
                    { transaction }
                );
                this.logger.debug(
                    `Updated ${tutor.formalEducation.length} formal education records for tutor with id: ${tutor.id}`
                );
            }
            return tutor;
        });
        return await this.findOne(id);
    }

    remove(id: UUID) {
        return this.tutorModel.destroy({ where: { id } });
    }
}
