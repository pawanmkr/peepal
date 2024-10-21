import * as bcrypt from 'bcrypt';
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v7 as uuidv7 } from 'uuid';
import { Op, UniqueConstraintError } from 'sequelize';
import { UUID } from 'node:crypto';

import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Cache } from '../../common/redis.cache';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    private readonly queryConfig = {
        model: User,
        attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'] },
    };

    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
        private readonly cache: Cache
    ) {}

    async create(dto: CreateUserDto): Promise<User> {
        try {
            dto.password = bcrypt.hashSync(dto.password, 10);
            return await this.userModel.create({
                id: uuidv7() as UUID,
                ...dto,
            });
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                this.logger.debug('unique constraint error');
                this.logger.warn('Username or email already exists');
                throw new ConflictException('Username or email already exists');
            } else {
                this.logger.debug('unknown error');
                this.logger.error(error);
                throw new InternalServerErrorException();
            }
        }
    }

    async findAll(offset: number, limit: number): Promise<User[]> {
        return this.userModel.findAll({
            ...this.queryConfig,
            offset,
            limit,
        });
    }

    async findOne(id: UUID): Promise<User> {
        const user = await this.userModel.findByPk(id, this.queryConfig);
        if (!user) throw new NotFoundException(`User with ID ${id} not found`);

        return user;
    }

    async update(id: UUID, dto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        if (!user) throw new NotFoundException(`User with ID ${id} not found`);

        // Only update the fields that are provided in the DTO
        Object.assign(user, dto);
        return user.save();
    }

    async remove(id: UUID): Promise<void> {
        const user = await this.findOne(id);
        if (!user) throw new NotFoundException(`User with ID ${id} not found`);

        await user.destroy();
    }

    async search(
        keyword: string,
        offset: number,
        limit: number
    ): Promise<{ users: User[]; total: number }> {
        // add keyword to cache for showing recent searches
        await this.cache.addKeyword(keyword);

        // firstly, get all the matching ids and then fetch full details
        // todo: improve this search later
        const matchingIds = await this.userModel.findAll({
            where: {
                [Op.or]: [
                    { skills: { [Op.iLike]: `%${keyword}%` } },
                    { description: { [Op.iLike]: `%${keyword}%` } },
                    { '$user.first_name$': { [Op.iLike]: `%${keyword}%` } },
                    { '$user.last_name$': { [Op.iLike]: `%${keyword}%` } },
                ],
            },
            subQuery: false,
        });
        const userIds = matchingIds.map((user) => user.id);
        const users = await this.userModel.findAll({
            where: {
                id: {
                    [Op.in]: userIds,
                },
            },
            offset,
            limit,
        });
        return { users, total: matchingIds.length };
    }
}
