import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
    PrimaryKey,
    Default,
    AllowNull,
    BelongsTo,
} from 'sequelize-typescript';
import { UUID } from 'node:crypto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { v7 as uuidv7 } from 'uuid';

import { User } from '../../user/user.model';

@Table({ tableName: 'slot' })
export class Slot extends Model<Slot> {
    @ApiProperty({
        example: 'a4b2c3d4-e5f6-7g8h-9i10-j11k12l13m14',
        description: 'The unique identifier for the slot.',
        type: String,
        format: 'uuid',
        readOnly: true,
    })
    @PrimaryKey
    @Default(() => uuidv7())
    @Column({ type: DataType.UUID })
    declare id: UUID;

    @ApiProperty({
        example: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,FR;BYHOUR=9;BYMINUTE=0',
        description: 'Recurring rule in iCalendar format (RFC 5545).',
        type: String,
        minLength: 5,
        maxLength: 255,
        required: true,
    })
    @AllowNull(false)
    @Column({ type: DataType.STRING })
    declare rule: string;

    @ApiProperty({
        example: true,
        description: 'Indicates whether the slot is available for slot.',
        type: Boolean,
        default: true,
        required: true,
    })
    @Default(true)
    @AllowNull(false)
    @Column({ type: DataType.BOOLEAN })
    isAvailable: boolean;

    @ApiProperty({
        example: 'e2f3g4h5-i6j7-k8l9-m10n11-o12p13q14r15',
        description: 'The ID of the user who created this slot.',
        type: String,
        format: 'uuid',
        nullable: true,
    })
    @ForeignKey(() => User)
    @AllowNull(true)
    @Column({ type: DataType.UUID })
    declare userId: UUID;

    @BelongsTo(() => User)
    user: User;
}
