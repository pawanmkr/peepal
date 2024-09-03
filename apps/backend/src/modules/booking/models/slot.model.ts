import { Column, DataType, ForeignKey, Model } from 'sequelize-typescript';
import { UUID } from 'node:crypto';
import { User } from '../../user/user.model';
import { Tutor } from '../../tutor/models/tutor.model';

export class TimeSlot extends Model<TimeSlot> {
	@Column({ type: DataType.UUID, primaryKey: true })
	declare id: UUID;

	@Column({ type: DataType.STRING, allowNull: false })
	declare rule: string;

	@Column({ type: DataType.BOOLEAN, allowNull: false })
	isAvailable: boolean;

	@ForeignKey(() => Tutor)
	@Column({ type: DataType.UUID, allowNull: true })
	declare tutorId: UUID;

	@ForeignKey(() => User)
	@Column({ type: DataType.UUID, allowNull: false })
	declare userId: UUID;
}
