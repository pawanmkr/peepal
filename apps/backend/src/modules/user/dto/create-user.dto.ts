import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsEmail,
    IsOptional,
    IsNotEmpty,
    IsUrl,
    Matches,
    IsEnum,
    IsDecimal,
} from 'class-validator';
import { regexPattern } from 'apps/backend/src/common/regex.pattern';
import { ChargeType } from 'apps/backend/src/common/common.enum';

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

    @ApiProperty({
        description: 'User description',
        example: 'I am a user with 10 years of experience',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    declare description: string;

    @ApiProperty({
        description: 'User skills',
        example: 'Problem solving, Communication, Patience',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    declare skills: string;

    @ApiProperty({
        description: 'User video URL',
        example: 'https://example.com/video.mp4',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    declare demoVideo: string;

    @ApiProperty({
        description: 'User location',
        example: 'Madhubani, India',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    declare location: string;

    @ApiProperty({
        description: 'Languages known by the user',
        example: 'Maithili, Hindi, English, Punjabi',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    declare languages: string;

    @ApiProperty({
        description: 'User charge currency',
        example: 'INR',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    declare currency: string;

    @ApiProperty({
        description: 'User charge amount',
        example: '50.00',
        type: 'string',
    })
    @IsDecimal()
    @IsNotEmpty()
    declare charge: number;

    @ApiProperty({
        description: 'Charge type (hourly, per session, per month, per week, per day)',
        example: ChargeType.HOURLY,
        type: 'string',
        enum: ChargeType,
    })
    @IsEnum(ChargeType)
    @IsNotEmpty()
    declare chargeType: ChargeType;
}
