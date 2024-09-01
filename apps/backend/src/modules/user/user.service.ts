import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v7 as uuidv7 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UniqueConstraintError } from 'sequelize';

import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './user.enum';
import { UUID } from 'node:crypto';

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
	) { }

	async create(dto: CreateUserDto): Promise<User> {
		try {
			dto.password = bcrypt.hashSync(dto.password, 10);
			return await this.userModel.create({
				id: uuidv7() as UUID,
				role: UserRole.USER,
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

	async findAll(): Promise<User[]> {
		return this.userModel.findAll(this.queryConfig);
	}

	async findOne(id: UUID): Promise<User> {
		const user = await this.userModel.findByPk(id, this.queryConfig);
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}
		return user;
	}

	async update(id: UUID, dto: UpdateUserDto): Promise<User> {
		const user = await this.findOne(id);
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}

		// Only update the fields that are provided in the DTO
		Object.assign(user, dto);
		return user.save();
	}

	async remove(id: UUID): Promise<void> {
		const user = await this.findOne(id);
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}
		await user.destroy();
	}
}
