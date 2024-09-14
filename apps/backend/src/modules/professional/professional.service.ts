import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UUID } from 'crypto';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { v7 as uuidv7 } from 'uuid';

import { Professional } from './models/professional.model';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { FormalEducation } from './models/formal-education.model';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { Cache } from '../../common/redis.cache';

@Injectable()
export class ProfessionalService {
    private readonly queryConfig = {
        include: [
            {
                model: FormalEducation,
                attributes: { exclude: ['professionalId', 'createdAt', 'updatedAt', 'deletedAt'] },
            },
            {
                model: User,
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
        ],
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt', 'deletedAt'] },
    };
    private readonly logger = new Logger(ProfessionalService.name);
    constructor(
        @InjectModel(Professional)
        private readonly professionalModel: typeof Professional,
        @InjectModel(FormalEducation)
        private readonly formalEducationModel: typeof FormalEducation,
        private readonly sequelize: Sequelize,
        private readonly userService: UserService,
        private readonly cache: Cache
    ) {}

    async create(dto: CreateProfessionalDto, userId: UUID) {
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new NotFoundException(`User with id: ${userId} not found`);
        }
        this.logger.debug(`Creating professional for user with id: ${userId}`);
        return this.sequelize.transaction(async (t) => {
            const professional = await this.professionalModel.create(
                {
                    id: uuidv7(),
                    ...dto,
                    userId,
                } as Professional,
                { transaction: t }
            );
            this.logger.debug(`Created professional with id: ${professional.id}`);
            professional.formalEducation = await this.formalEducationModel.bulkCreate(
                dto.formalEducation.map((education) => ({
                    ...education,
                    id: uuidv7() as UUID,
                    professionalId: professional.id as UUID,
                })),
                { transaction: t }
            );
            this.logger.debug(
                `Created ${professional.formalEducation.length} formal education records for professional with id: ${professional.id}`
            );
            return await this.findOne(professional.id as UUID);
        });
    }

    findAll(offset: number, limit: number) {
        return this.professionalModel.findAll({ ...this.queryConfig, offset, limit });
    }

    findOne(id: UUID): Promise<Professional | null> {
        return this.professionalModel.findByPk(id, this.queryConfig);
    }

    async search(
        keyword: string,
        offset: number,
        limit: number
    ): Promise<{ professionals: Professional[]; total: number }> {
        await this.cache.addKeyword(keyword);
        // Step 1: Get matching professional IDs
        const matchingTutorIds = await this.professionalModel.findAll({
            attributes: ['id'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: [],
                },
                {
                    model: FormalEducation,
                    as: 'formalEducation',
                    attributes: [],
                },
            ],
            where: {
                [Op.or]: [
                    { skills: { [Op.iLike]: `%${keyword}%` } },
                    { description: { [Op.iLike]: `%${keyword}%` } },
                    { '$user.first_name$': { [Op.iLike]: `%${keyword}%` } },
                    { '$user.last_name$': { [Op.iLike]: `%${keyword}%` } },
                    { '$formalEducation.subjects$': { [Op.iLike]: `%${keyword}%` } },
                    { '$formalEducation.institution$': { [Op.iLike]: `%${keyword}%` } },
                ],
            },
            subQuery: false,
        });
        const professionalIds = matchingTutorIds.map((professional) => professional.id);
        // Step 2: Fetch full professional data with associations
        const professionals = await this.professionalModel.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                },
                {
                    model: FormalEducation,
                    as: 'formalEducation',
                },
            ],
            where: {
                id: {
                    [Op.in]: professionalIds,
                },
            },
            offset,
            limit,
        });

        return { professionals, total: matchingTutorIds.length };
    }

    async update(id: UUID, dto: UpdateProfessionalDto) {
        const professional = await this.findOne(id);
        if (!professional) {
            throw new NotFoundException(`Professional with id: ${id} not found`);
        }
        this.logger.debug(`Updating professional with id: ${professional.id}`);
        // Use a transaction to ensure that all operations are atomic
        await this.sequelize.transaction(async (transaction) => {
            // Automatically assign all fields from the DTO to the professional model
            Object.assign(professional, dto);
            await professional.update({ ...dto } as Professional, { transaction });
            this.logger.debug(`Updated professional with id: ${professional.id}`);
            // Delete all formal education records associated with the professional and create new ones
            if (dto.formalEducation && dto.formalEducation.length > 0) {
                this.logger.debug(
                    `Found ${dto.formalEducation.length} formal education records for professional with id: ${professional.id}`
                );
                await this.formalEducationModel.destroy({
                    where: {
                        professionalId: professional.id,
                    },
                    force: true,
                    transaction,
                });
                this.logger.debug(
                    `Deleted all formal education records for professional with id: ${professional.id}`
                );
                professional.formalEducation = await this.formalEducationModel.bulkCreate(
                    dto.formalEducation.map((education) => ({
                        id: uuidv7() as UUID,
                        ...education,
                        professionalId: professional.id as UUID,
                    })),
                    { transaction }
                );
                this.logger.debug(
                    `Updated ${professional.formalEducation.length} formal education records for professional with id: ${professional.id}`
                );
            }
            return professional;
        });
        return await this.findOne(id);
    }

    remove(id: UUID) {
        return this.professionalModel.destroy({ where: { id } });
    }
}
