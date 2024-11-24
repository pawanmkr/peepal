// src/chat/chat.model.ts
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Optional } from 'sequelize'; // Optional from sequelize

interface ChatAttributes {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
}

// Type for creating chat entries
type ChatCreationAttributes = Optional<ChatAttributes, 'id' | 'timestamp'>;

@Table({ tableName: 'chat' })
export class Chat extends Model<ChatAttributes, ChatCreationAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4, // UUID auto-generation
  })
  declare id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare senderId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare receiverId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare message: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW, // Current timestamp by default
  })
  declare timestamp: Date;
}
