import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsInt, Min, Max, Length } from 'class-validator';
import { UUID } from 'node:crypto';

export class CreateReviewDto {
    @ApiProperty({
        description: 'Rating given by the user, between 1 and 5.',
        example: 5,
        minimum: 1,
        maximum: 5,
        type: Number,
    })
    @IsInt()
    @Min(1)
    @Max(5)
    declare rating: number;

    @ApiProperty({
        description: 'Comment or feedback left by the user.',
        example: 'The session was very helpful and informative.',
        type: String,
        minLength: 1,
        maxLength: 5000,
    })
    @IsString()
    @Length(1, 5000)
    declare comment: string;

    @ApiProperty({
        description: 'The ID of the user who is leaving the review.',
        example: 'u1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        type: String,
        format: 'uuid',
    })
    @IsUUID()
    declare userId: UUID;

    @ApiProperty({
        description: 'The ID of the professional being reviewed.',
        example: 'p3f4h5i6-j7k8-l9m10-n11o12-p13q14r15s16',
        type: String,
        format: 'uuid',
    })
    @IsUUID()
    declare professionalId: UUID;
}
