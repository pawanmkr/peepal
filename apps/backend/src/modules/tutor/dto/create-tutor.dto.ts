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
import { TutorChargeType } from '../tutor.enum';
import { CreateFormalEducationDto } from './create-formal-education.dto';
import { Type } from 'class-transformer';

export class CreateTutorDto {
    @ApiProperty({
        description: 'Tutor description',
        example: 'I am a professional tutor with 10 years of experience',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'Tutor experience in years',
        example: 3,
        type: 'number',
    })
    @IsNumber()
    @IsNotEmpty()
    experience: number;

    @ApiProperty({
        description: 'Tutor skills',
        example: 'Problem solving, Communication, Patience',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    skills: string;

    @ApiProperty({
        description: 'Tutor video URL',
        example: 'https://example.com/video.mp4',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    video: string;

    @ApiProperty({
        description: 'Tutor location',
        example: 'Madhubani, India',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    location: string;

    @ApiProperty({
        description: 'Languages known by the tutor',
        example: 'Maithili, Hindi, English, Punjabi',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    languages: string;

    @ApiProperty({
        description: 'Tutor availability',
        example: 'Available on weekdays',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    availability: string;

    @ApiProperty({
        description: 'Tutor charge currency',
        example: 'INR',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    currency: string;

    @ApiProperty({
        description: 'Tutor charge amount',
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

    @ApiProperty({
        description: 'Available days for tutoring',
        example: 'Monday, Wednesday, Friday',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    days: string;

    @ApiProperty({
        description: 'Start time of availability',
        example: '09:15:00',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    startTime: string;

    @ApiProperty({
        description: 'End time of availability',
        example: '05:00:00',
        type: 'string',
    })
    @IsString()
    @IsNotEmpty()
    endTime: string;

    @ApiProperty({ type: CreateFormalEducationDto, isArray: true })
    @Type(() => CreateFormalEducationDto)
    @ValidateNested()
    @IsOptional()
    formalEducation: CreateFormalEducationDto[];
}
