import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsOptional,
    IsNumber,
    IsEnum,
    IsEmail,
    IsUUID,
    IsDateString,
    MinLength,
} from 'class-validator';
import { ChargeType } from '../../../common/common.enum';

export class UpdateUserDto {
    @ApiProperty({
        description: 'First name of the user',
        type: 'string',
        required: false,
    })
    @IsString()
    @IsOptional()
    declare firstName?: string;

    @ApiProperty({
        description: 'Last name of the user',
        type: 'string',
        required: false,
    })
    @IsString()
    @IsOptional()
    declare lastName?: string;

    @ApiProperty({
        description: 'Email address of the user',
        type: 'string',
        required: false,
    })
    @IsEmail()
    @IsOptional()
    declare email?: string;

    @ApiProperty({
        description: 'User description',
        type: 'string',
        required: false,
    })
    @IsString()
    @IsOptional()
    declare description?: string;

    @ApiProperty({
        description: 'Skills of the user',
        type: 'string',
        required: false,
    })
    @IsString()
    @IsOptional()
    declare skills?: string;

    @ApiProperty({
        description: 'Location of the user',
        type: 'string',
        required: false,
    })
    @IsString()
    @IsOptional()
    declare location?: string;

    @ApiProperty({
        description: 'Languages known by the user',
        type: 'string',
        required: false,
    })
    @IsString()
    @IsOptional()
    declare languages?: string;

    @ApiProperty({
        description: 'Charge of the user in the given currency',
        type: 'number',
        required: false,
    })
    @IsNumber()
    @IsOptional()
    declare charge?: number;

    @ApiProperty({
        description: 'Charge type of the user (hourly, per session, per month, per week, per day)',
        type: 'string',
        enum: ChargeType,
        required: false,
    })
    @IsEnum(ChargeType)
    @IsOptional()
    declare chargeType?: ChargeType;

    @ApiProperty({
        description: 'Date of birth of the user',
        type: 'string',
        format: 'date',
        required: false,
    })
    @IsDateString()
    @IsOptional()
    declare dob?: string;

    @ApiProperty({
        description: 'Phone number country code',
        type: 'string',
        required: false,
    })
    @IsString()
    @IsOptional()
    declare phoneCode?: string;

    @ApiProperty({
        description: 'Phone number of the user',
        type: 'string',
        required: false,
    })
    @IsString()
    @IsOptional()
    declare phoneNumber?: string;

    @ApiProperty({
        description: 'Avatar URL of the user',
        type: 'string',
        required: false,
    })
    @IsString()
    @IsOptional()
    declare avatar?: string;

    @ApiProperty({
        description: 'User rating',
        type: 'number',
        required: false,
    })
    @IsNumber()
    @IsOptional()
    declare rating?: number;

    @ApiProperty({
        description: 'User demo video URL',
        type: 'string',
        required: false,
    })
    @IsString()
    @IsOptional()
    declare demoVideo?: string;

    @ApiProperty({
        description: 'Currency used by the user for charges (e.g., USD, INR)',
        type: 'string',
        required: false,
    })
    @IsString()
    @IsOptional()
    declare currency?: string;

    @ApiProperty({
        description: 'Current password of the user (required to change the password)',
        type: 'string',
        required: false,
    })
    @IsString()
    @IsOptional()
    declare currentPassword?: string;

    @ApiProperty({
        description: 'New password of the user',
        type: 'string',
        required: false,
    })
    @IsString()
    @IsOptional()
    @MinLength(8, { message: 'New password must be at least 8 characters long' })
    declare newPassword?: string;
}
