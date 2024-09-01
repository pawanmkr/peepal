import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsDate, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({
		description: 'Username',
		example: 'johndoe',
		type: 'string',
	})
	@IsString()
	@IsNotEmpty()
	declare username: string;

	@ApiProperty({
		description: 'First name',
		example: 'John',
		type: 'string',
	})
	@IsString()
	@IsNotEmpty()
	declare firstName: string;

	@ApiProperty({
		description: 'Last name',
		example: 'Doe',
		type: 'string',
	})
	@IsString()
	@IsNotEmpty()
	declare lastName: string;

	@ApiProperty({
		description: 'Email address',
		type: 'string',
	})
	@IsEmail()
	@IsNotEmpty()
	declare email: string;

	@ApiPropertyOptional({
		description: 'Avatar URL',
		type: 'string',
	})
	@IsOptional()
	@IsString()
	declare avatar?: string;

	@ApiPropertyOptional({
		description: 'Date of birth',
		type: 'string',
		example: '1990-01-01',
	})
	@IsOptional()
	@IsDate()
	declare dob?: Date;

	@ApiPropertyOptional({
		description: 'Phone number country code',
		type: 'string',
		example: '91',
	})
	@IsOptional()
	@IsString()
	declare phoneCode?: string;

	@ApiPropertyOptional({
		description: 'Phone number',
		example: '9876543210',
		type: 'string',
	})
	@IsOptional()
	@IsString()
	declare phoneNumber?: string;

	@ApiProperty({
		description: 'Password',
		example: 'password123',
		type: 'string',
	})
	@IsString()
	@IsNotEmpty()
	declare password: string;
}
