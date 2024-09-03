import { Column, DataType, ForeignKey, Model, Table, PrimaryKey, Default, AllowNull, BelongsTo } from 'sequelize-typescript';
import { UUID, randomUUID } from 'node:crypto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Slot } from './slot.model';

@Table({ tableName: 'sessions' })
export class Session extends Model<Session> {
	@ApiProperty({
		example: 'f3g4h5i6-j7k8-l9m10-n11o12-p13q14r15s16',
		description: 'The unique identifier for the session.',
		type: String,
		format: 'uuid',
		readOnly: true
	})
	@PrimaryKey
	@Default(() => randomUUID())
	@Column({ type: DataType.UUID })
	declare id: UUID;

	@ApiProperty({
		example: 'Mathematics Tutoring',
		description: 'The name of the session.',
		type: String,
		minLength: 3,
		maxLength: 255,
		required: true
	})
	@AllowNull(false)
	@Column({ type: DataType.STRING })
	declare name: string;

	@ApiProperty({
		example: 'A detailed session on algebra and calculus.',
		description: 'A description of the session.',
		type: String,
		maxLength: 5000,
		required: true
	})
	@AllowNull(false)
	@Column({ type: DataType.TEXT })
	declare description: string;

	@ApiProperty({
		example: 50.0,
		description: 'The cost of the session in INR.',
		type: Number,
		format: 'float',
		minimum: 0,
		required: true
	})
	@AllowNull(false)
	@Default(0.0)
	@Column({ type: DataType.DECIMAL(10, 2) })
	declare cost: number;

	@ApiProperty({
		example: 60,
		description: 'The duration of the session in minutes.',
		type: Number,
		minimum: 1,
		maximum: 1440,
		required: true
	})
	@AllowNull(false)
	@Column({ type: DataType.INTEGER  })
	declare duration: number;

	@ApiPropertyOptional({
		example: 'f4g5h6i7-j8k9-l10m11-n12o13-p14q15r16s17',
		description: 'The ID of the associated slot.',
		type: String,
		format: 'uuid',
		nullable: true
	})
	@ForeignKey(() => Slot)
	@AllowNull(true)
	@Column({ type: DataType.UUID })
	declare slotId: UUID;

	@BelongsTo(() => Slot)
	slot: Slot;
}
