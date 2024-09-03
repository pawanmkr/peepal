import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNumber, IsOptional, Length, Min } from 'class-validator';

export class SessionCreateDto {
	@ApiProperty({
		example: 'Mathematics Tutoring',
		description: 'The name of the session.',
		type: String,
		minLength: 3,
		maxLength: 255,
		required: true
	})
	@IsString()
	@Length(3, 255)
	name: string;

	@ApiProperty({
		example: 'A detailed session on algebra and calculus.',
		description: 'A description of the session.',
		type: String,
		maxLength: 5000,
		required: true
	})
	@IsString()
	@Length(1, 5000)
	description: string;

	@ApiProperty({
		example: 50.0,
		description: 'The cost of the session in USD.',
		type: Number,
		format: 'float',
		required: true
	})
	@IsNumber()
	cost: number;

	@ApiProperty({
		example: 60,
		description: 'The duration of the session in minutes.',
		type: Number,
		required: true
	})
	@IsNumber()
	duration: number;

	@ApiProperty({
		example: 'f4g5h6i7-j8k9-l10m11-n12o13-p14q15r16s17',
		description: 'The ID of the associated slot (optional).',
		type: String,
		format: 'uuid',
		required: false
	})
	@IsOptional()
	@IsUUID()
	slotId?: string;
}
