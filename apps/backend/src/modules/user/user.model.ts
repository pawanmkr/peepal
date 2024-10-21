import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { UUID } from 'node:crypto';
import { Slot } from '../slot/models/slot.model';
import { ChargeType } from '../../common/common.enum';

@Table({ tableName: 'user' })
export class User extends Model<User> {
    @ApiProperty({
        description: 'Unique identifier',
        example: 'c56f6e7f-0f82-4e3f-8f1d-0e3d0f1b8e0b',
        type: 'string',
        format: 'uuid',
    })
    @Column({ type: DataType.UUID, primaryKey: true })
    declare id: UUID;

    @ApiProperty({
        description: 'Username',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    declare username: string;

    @ApiProperty({
        description: 'First name',
        example: 'John',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    declare firstName: string;

    @ApiProperty({
        description: 'Last name',
        example: 'Doe',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    declare lastName: string;

    @ApiProperty({
        description: 'Email address',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    declare email: string;

    @ApiProperty({
        description: 'Avatar URL',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: true })
    declare avatar: string;

    @ApiProperty({
        description: 'Date of birth',
        type: 'string',
        example: '1990-01-01',
    })
    @Column({ type: DataType.DATEONLY, allowNull: true })
    declare dob: string;

    @ApiProperty({
        description: 'Phone number country code',
        type: 'string',
        example: '91',
    })
    @Column({ type: DataType.STRING, allowNull: true })
    declare phoneCode: string;

    @ApiProperty({
        description: 'Phone number',
        example: '9876543210',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: true })
    declare phoneNumber: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare password: string;

    // Professional-related fields
    @ApiProperty({
        description: 'Professional description',
        example: 'I am a professional with 10 years of experience',
        type: 'string',
    })
    @Column({ type: DataType.STRING, allowNull: true })
    declare description: string;

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
    declare demoVideo: string;

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
        example: ChargeType.HOURLY,
        type: 'string',
        enum: ChargeType,
    })
    @Column({ type: DataType.STRING, allowNull: true })
    declare chargeType: ChargeType;

    @HasMany(() => Slot)
    declare slots: Slot[];
}
