import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { regexPattern } from 'apps/backend/src/common/regex.patter';
import { IsString, IsEmail, IsOptional, IsNotEmpty, IsUrl, Matches } from 'class-validator';

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
		example: 'johndoe@email.com',
		type: 'string',
	})
	@IsEmail()
	@IsNotEmpty()
	declare email: string;

	@ApiPropertyOptional({
		description: 'Avatar URL',
		example: 'https://example.com/avatar.jpg',
		type: 'string',
	})
	@IsOptional()
	@IsUrl()
	declare avatar?: string;

	@ApiPropertyOptional({
		description: 'Date of birth (YYYY-MM-DD)',
		type: 'string',
		example: '1990-01-01',
	})
	@IsOptional()
	@Matches(regexPattern.date)
	declare dob?: string;

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
