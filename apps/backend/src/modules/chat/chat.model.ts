import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { UUID } from 'node:crypto';
import { User } from '../user/user.model';

@Table({ tableName: 'chat' })
export class Chat extends Model<Chat> {
    @ApiProperty({
        description: 'Unique identifier for the message',
        example: 'c56f6e7f-0f82-4e3f-8f1d-0e3d0f1b8e0b',
        type: 'string',
        format: 'uuid',
    })
    @Column({
        type: DataType.UUID,
        primaryKey: true,
    })
    declare id: UUID;

    @ApiProperty({
        description: 'Unique identifier for the sender (user)',
        example: 'a12b34c5-d6e7-8f90-g1h2-i345jklmno67',
        type: 'string',
        format: 'uuid',
    })
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare sender: UUID;

    @ApiProperty({
        description: 'Unique identifier for the receiver (user)',
        example: 'b98c76d5-e4f3-2g1h-i9j8-klmnop123456',
        type: 'string',
        format: 'uuid',
    })
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare receiver: UUID;

    @ApiProperty({
        description: 'Content of the message',
        example: 'Hello, how are you?',
        type: 'string',
    })
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    declare message: string;
}
