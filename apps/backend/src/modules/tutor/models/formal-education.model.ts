import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Tutor } from './tutor.model';
import { UUID } from 'crypto';

@Table({ tableName: 'formal_education' })
export class FormalEducation extends Model<FormalEducation> {
	@ApiProperty({
		description: 'Unique identifier of the formal education',
		example: 'c56f6e7f-0f82-4e3f-8f1d-0e3d0f1b8e0b',
		type: 'string',
		format: 'uuid',
	})
	@Column({ type: DataType.UUID, primaryKey: true })
	declare id: UUID;

	@ApiProperty({
		description: 'Unique identifier of the tutor associated with this education',
		example: 'c56f6e7f-0f82-4e3f-8f1d-0e3d0f1b8e0b',
		type: 'string',
		format: 'uuid',
	})
	@ForeignKey(() => Tutor)
	@Column({ type: DataType.UUID, allowNull: false })
	declare tutorId: UUID;

	@ApiProperty({
		description: 'Tutor qualification',
		example: 'Masters in Mathematics',
		type: 'string',
	})
	@Column({ type: DataType.STRING, allowNull: false })
	declare qualification: string;

	@ApiProperty({
		description: 'Institution name',
		example: 'Harvard University',
		type: 'string',
	})
	@Column({ type: DataType.STRING, allowNull: false })
	declare institution: string;

	@ApiProperty({
		description: 'Year of graduation',
		example: '2010',
		type: 'number',
	})
	@Column({ type: DataType.INTEGER, allowNull: false })
	declare year: number;

	@ApiProperty({
		description: 'Subjects taught',
		example: 'Mathematics, Physics, Chemistry',
		type: 'string',
	})
	@Column({ type: DataType.STRING, allowNull: false })
	declare subjects: string;

	@BelongsTo(() => Tutor)
	declare tutor: Tutor;
}
