import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsEnum,
    IsDecimal,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { TutorChargeType } from '../professional.enum';
import { CreateFormalEducationDto } from './create-formal-education.dto';
import { Type } from 'class-transformer';

export class CreateProfessionalDto {
    @ApiProperty({
        description: 'Professional description',
        example: 'I am a professional professional with 10 years of experience',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'Professional experience in years',
        example: 3,
        type: 'number',
    })
    @IsNumber()
    @IsNotEmpty()
    experience: number;

    @ApiProperty({
        description: 'Professional skills',
        example: 'Problem solving, Communication, Patience',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    skills: string;

    @ApiProperty({
        description: 'Professional video URL',
        example: 'https://example.com/video.mp4',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    video: string;

    @ApiProperty({
        description: 'Professional location',
        example: 'Madhubani, India',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    location: string;

    @ApiProperty({
        description: 'Languages known by the professional',
        example: 'Maithili, Hindi, English, Punjabi',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    languages: string;

    @ApiProperty({
        description: 'Professional availability',
        example: 'Available on weekdays',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    availability: string;

    @ApiProperty({
        description: 'Professional charge currency',
        example: 'INR',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    currency: string;

    @ApiProperty({
        description: 'Professional charge amount',
        example: '50.00',
        type: 'string',
    })
    @IsDecimal()
    @IsNotEmpty()
    charge: number;

    @ApiProperty({
        description: 'Charge type (hourly, per session, per month, per week, per day)',
        example: TutorChargeType.HOURLY,
        type: 'string',
        enum: TutorChargeType,
    })
    @IsEnum(TutorChargeType)
    @IsNotEmpty()
    chargeType: TutorChargeType;

    @ApiProperty({ type: CreateFormalEducationDto, isArray: true })
    @Type(() => CreateFormalEducationDto)
    @ValidateNested()
    @IsOptional()
    formalEducation: CreateFormalEducationDto[];
}
