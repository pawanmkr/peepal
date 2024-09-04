import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNumber, IsOptional, Length, Min } from 'class-validator';

export class CreateSessionDto {
    @ApiProperty({
        example: 'Mathematics Tutoring',
        description: 'The name of the session.',
        type: String,
        minLength: 3,
        maxLength: 255,
        required: true,
    })
    @IsString()
    @Length(3, 255)
    declare name: string;

    @ApiProperty({
        example: 'A detailed session on algebra and calculus.',
        description: 'A description of the session.',
        type: String,
        maxLength: 5000,
        required: true,
    })
    @IsString()
    @Length(1, 5000)
    @IsOptional()
    declare description: string;

    @ApiProperty({
        example: 50.0,
        description: 'The cost of the session in INR.',
        type: Number,
        format: 'float',
        required: true,
    })
    @IsNumber()
    declare cost: number;

    @ApiProperty({
        example: 60,
        description: 'The duration of the session in minutes.',
        type: Number,
        required: true,
    })
    @IsNumber()
    declare duration: number;

    @ApiProperty({
        example: 'DTSTART:20120201T023000Z\nRRULE:FREQ=MONTHLY;COUNT=5',
        description: 'The recurring rule for the session in iCalendar format.',
        type: String,
        required: false,
    })
    @IsString()
    declare rule: string;
}
