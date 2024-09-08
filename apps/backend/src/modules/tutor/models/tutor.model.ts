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
import { TutorChargeType } from '../tutor.enum';
import { FormalEducation } from './formal-education.model';

@Table({ tableName: 'tutor' })
export class Tutor extends Model<Tutor> {
    @ApiProperty({
        description: 'Unique identifier of the tutor',
        example: 'c56f6e7f-0f82-4e3f-8f1d-0e3d0f1b8e0b',
        type: 'string',
        format: 'uuid',
    })
    @Column({ type: DataType.UUID, primaryKey: true })
    declare id: string;

    @ApiProperty({
        description: 'Unique identifier of the user associated with this tutor',
        example: 'c56f6e7f-0f82-4e3f-8f1d-0e3d0f1b8e0b',
        type: 'string',
        format: 'uuid',
    })
    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    declare userId: string;

    @ApiProperty({
        description: 'Tutor description',
        example: 'I am a professional tutor with 10 years of experience',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    declare description: string;

    @ApiProperty({
        description: 'Tutor experience in years',
        example: 3,
        type: 'number',
    })
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare experience: number;

    @ApiProperty({
        description: 'Tutor skills',
        example: 'Problem solving, Communication, Patience',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    declare skills: string;

    @ApiProperty({
        description: 'Tutor rating',
        example: 4.5,
        type: 'number',
    })
    @Column({ type: DataType.DECIMAL, allowNull: true, defaultValue: 0 })
    declare rating: number;

    @ApiProperty({
        description: 'Tutor video URL',
        example: 'https://example.com/video.mp4',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    declare video: string;

    @ApiProperty({
        description: 'Tutor location',
        example: 'Madhubani, India',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    declare location: string;

    @ApiProperty({
        description: 'Languages known by the tutor',
        example: 'Maithili, Hindi, English, Punjabi',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    declare languages: string;

    @ApiProperty({
        description: 'Tutor availability',
        example: 'Available on weekdays',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    declare availability: string;

    @ApiProperty({
        description: 'Tutor charge currency',
        example: 'INR',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    declare currency: string;

    @ApiProperty({
        description: 'Tutor charge amount',
        example: 50.0,
        type: 'number',
    })
    @Column({ type: DataType.DECIMAL, allowNull: false })
    declare charge: number;

    @ApiProperty({
        description: 'Charge type (hourly, per session, per month, per week, per day)',
        example: TutorChargeType.HOURLY,
        type: 'string',
        enum: TutorChargeType,
    })
    @Column({ type: DataType.STRING, allowNull: false })
    declare chargeType: TutorChargeType;

    @ApiProperty({
        description: 'Available days for tutoring',
        example: 'Monday, Wednesday, Friday',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    declare days: string;

    @ApiProperty({
        description: 'Start time of availability',
        example: '09:15:00',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    declare startTime: string;

    @ApiProperty({
        description: 'End time of availability',
        example: '05:00:00',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    declare endTime: string;

    @HasMany(() => FormalEducation)
    declare formalEducation: FormalEducation[];

    @BelongsTo(() => User)
    declare user: User;
}
