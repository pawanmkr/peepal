import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { v7 as uuidv7 } from 'uuid';
import * as bcrypt from 'bcrypt';

export enum UserRole {
	TUTOR = 'tutor',
	USER = 'user',
}

@Table({ tableName: 'users' })
export class User extends Model<User> {
	@ApiProperty({
		description: 'Unique identifier',
		example: 'c56f6e7f-0f82-4e3f-8f1d-0e3d0f1b8e0b',
		type: 'string',
		format: 'uuid',
	})
	@Column({ type: DataType.UUID, primaryKey: true })
	declare id: string;

	@ApiProperty({
		description: 'Username',
		example: 'johndoe',
		type: 'string',
	})
	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	declare username: string;

	@ApiProperty({
		description: 'Slug',
		example: 'john-doe',
		type: 'string',
	})
	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	declare slug: string;

	@ApiProperty({
		description: 'First name',
		example: 'John',
		type: 'string',
	})
	@Column({ type: DataType.STRING, allowNull: false })
	declare firstName: string;

	@ApiProperty({
		description: 'Last name',
		example: 'Doe',
		type: 'string',
	})
	@Column({ type: DataType.STRING, allowNull: false })
	declare lastName: string;

	@ApiProperty({
		description: 'Email address',
		type: 'string',
	})
	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	declare email: string;

	@ApiProperty({
		description: 'Avatar URL',
		type: 'string',
	})
	@Column({ type: DataType.STRING, allowNull: true })
	declare avatar: string;

	@ApiProperty({
		description: 'Date of birth',
		type: 'string',
		example: '1990-01-01',
	})
	@Column({ type: DataType.DATEONLY, allowNull: true })
	declare dob: Date;

	@ApiProperty({
		description: 'Phone number country code',
		type: 'string',
		example: '91',
	})
	@Column({ type: DataType.STRING, allowNull: true })
	declare phoneCode: string;

	@ApiProperty({
		description: 'Phone number',
		example: '9876543210',
		type: 'string',
	})
	@Column({ type: DataType.STRING, allowNull: true })
	declare phoneNumber: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare password: string;

	@ApiProperty({
		description: 'User role',
		example: UserRole.USER,
		type: 'string',
		enum: UserRole,
	})
	@Column({ type: DataType.STRING, allowNull: false })
	declare role: UserRole;

	beforeCreate() {
		this.id = uuidv7();
		this.slug = `${this.firstName.toLowerCase()}-${this.lastName.toLowerCase()}`;
		this.role = UserRole.USER;

		// Hash the password before saving it to the database
		const hash = bcrypt.hashSync(this.password, 10);
		this.password = hash;
	}
}
