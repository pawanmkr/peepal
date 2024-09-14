import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
    PrimaryKey,
    AllowNull,
    BelongsTo,
} from 'sequelize-typescript';
import { UUID } from 'node:crypto';
import { ApiProperty } from '@nestjs/swagger';

import { Professional } from '../professional/models/professional.model';
import { User } from '../user/user.model';

@Table({ tableName: 'review' })
export class Review extends Model<Review> {
    @ApiProperty({
        example: 'a3f5d7h9-i0j1-k2l3-m4n5-o6p7q8r9s0t1',
        description: 'The unique identifier for the review.',
        type: String,
        format: 'uuid',
        readOnly: true,
    })
    @PrimaryKey
    @Column({ type: DataType.UUID })
    declare id: UUID;

    @ApiProperty({
        example: 5,
        description: 'The rating given by the user to the professional, on a scale of 1 to 5.',
        minimum: 1,
        maximum: 5,
        required: true,
        type: Number,
    })
    @AllowNull(false)
    @Column({ type: DataType.INTEGER, validate: { min: 1, max: 5 } })
    declare rating: number;

    @ApiProperty({
        example: 'Great session, very helpful and insightful!',
        description: 'The review comment left by the user.',
        type: String,
        maxLength: 5000,
        required: true,
    })
    @AllowNull(false)
    @Column({ type: DataType.TEXT })
    declare comment: string;

    @ApiProperty({
        description: 'ID of the user who left the review.',
        example: 'u1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        type: String,
        format: 'uuid',
        required: true,
    })
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({ type: DataType.UUID })
    declare userId: UUID;

    @ApiProperty({
        description: 'ID of the professional being reviewed.',
        example: 'p3f4h5i6-j7k8-l9m10-n11o12-p13q14r15s16',
        type: String,
        format: 'uuid',
        required: true,
    })
    @ForeignKey(() => Professional)
    @AllowNull(false)
    @Column({ type: DataType.UUID })
    declare professionalId: UUID;

    @BelongsTo(() => Professional)
    professional: Professional;

    @BelongsTo(() => User)
    user: User;
}
