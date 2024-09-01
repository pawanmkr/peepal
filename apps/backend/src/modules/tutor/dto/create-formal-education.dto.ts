import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFormalEducationDto {
	@ApiProperty({
		description: 'Tutor qualification',
		example: 'Masters in Mathematics',
		type: 'string',
	})
	@IsString()
	@IsNotEmpty()
	qualification: string;

	@ApiProperty({
		description: 'Institution name',
		example: 'Harvard University',
		type: 'string',
	})
	@IsString()
	@IsNotEmpty()
	institution: string;

	@ApiProperty({
		description: 'Year of graduation',
		example: '2010',
		type: 'number',
	})
	@IsNumber()
	@IsNotEmpty()
	year: number;

	@ApiProperty({
		description: 'Subjects taught',
		example: 'Mathematics, Physics, Chemistry',
		type: 'string',
	})
	@IsString()
	@IsNotEmpty()
	subjects: string;
}
