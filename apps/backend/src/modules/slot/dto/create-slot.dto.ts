import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'apps/backend/src/common/common.enum';
import { IsUUID, IsBoolean, IsString, Length, IsOptional } from 'class-validator';

export class CreateSlotDto {
    @ApiProperty({
        example: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,FR',
        description: 'Recurring rule in iCalendar format (RFC 5545).',
        type: String,
        minLength: 5,
        maxLength: 255,
        required: true,
    })
    @IsString()
    @Length(5, 255)
    declare rule: string;

    @ApiProperty({
        example: true,
        description: 'Indicates whether the slot is available for slot.',
        type: Boolean,
        required: true,
    })
    @IsBoolean()
    declare isAvailable: boolean;

    @ApiProperty({
        example: 'e2f3g4h5-i6j7-k8l9-m10n11-o12p13q14r15',
        description: 'The ID of the user who is creating this slot.',
        type: String,
        format: 'uuid',
        required: false,
    })
    @IsUUID()
    declare userId: string;
}
