import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    HasMany,
    BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../user/user.model';
import { TutorChargeType } from '../professional.enum';
import { FormalEducation } from './formal-education.model';

@Table({ tableName: 'professional' })
export class Professional extends Model<Professional> {
    @ApiProperty({
        description: 'Unique identifier of the professional',
        example: 'c56f6e7f-0f82-4e3f-8f1d-0e3d0f1b8e0b',
        type: 'string',
        format: 'uuid',
    })
    @Column({ type: DataType.UUID, primaryKey: true })
    declare id: string;

    @ApiProperty({
        description: 'Unique identifier of the user associated with this professional',
        example: 'c56f6e7f-0f82-4e3f-8f1d-0e3d0f1b8e0b',
        type: 'string',
        format: 'uuid',
    })
    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    declare userId: string;

    @ApiProperty({
        description: 'Professional description',
        example: 'I am a professional professional with 10 years of experience',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: true })
    declare description: string;

    @ApiProperty({
        description: 'Professional experience in years',
        example: 3,
        type: 'number',
    })
    @Column({ type: DataType.INTEGER, allowNull: true })
    declare experience: number;

    @ApiProperty({
        description: 'Professional skills',
        example: 'Problem solving, Communication, Patience',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: true })
    declare skills: string;

    @ApiProperty({
        description: 'Professional rating',
        example: 4.5,
        type: 'number',
    })
    @Column({ type: DataType.DECIMAL, allowNull: true, defaultValue: 0 })
    declare rating: number;

    @ApiProperty({
        description: 'Professional video URL',
        example: 'https://example.com/video.mp4',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: true })
    declare video: string;

    @ApiProperty({
        description: 'Professional location',
        example: 'Madhubani, India',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: true })
    declare location: string;

    @ApiProperty({
        description: 'Languages known by the professional',
        example: 'Maithili, Hindi, English, Punjabi',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: true })
    declare languages: string;

    @ApiProperty({
        description: 'Professional availability',
        example: 'Available on weekdays',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: true })
    declare availability: string;

    @ApiProperty({
        description: 'Professional charge currency',
        example: 'INR',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: true })
    declare currency: string;

    @ApiProperty({
        description: 'Professional charge amount',
        example: 50.0,
        type: 'number',
    })
    @Column({ type: DataType.DECIMAL, allowNull: true })
    declare charge: number;

    @ApiProperty({
        description: 'Charge type (hourly, per session, per month, per week, per day)',
        example: TutorChargeType.HOURLY,
        type: 'string',
        enum: TutorChargeType,
    })
    @Column({ type: DataType.STRING, allowNull: true })
    declare chargeType: TutorChargeType;

    @HasMany(() => FormalEducation)
    declare formalEducation: FormalEducation[];

    @BelongsTo(() => User)
    declare user: User;
}
