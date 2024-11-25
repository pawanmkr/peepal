import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.model';

import { v7 as uuidv7 } from 'uuid';
import { UUID } from 'node:crypto';

@Injectable()
export class ChatService {
    constructor(@InjectModel(Chat) private readonly chatModel: typeof Chat) {}

    // Saving chat message to database between two users
    async createMessage(data: { sender: UUID; receiver: UUID; message: string }): Promise<Chat> {
        const id = uuidv7() as UUID;
        return this.chatModel.create({ id, ...data });
    }

    // Get chat history of two users in ASCENDING order (in order the messages were recorded)
    async getMessages(sender: string, receiver: string): Promise<Chat[]> {
        return this.chatModel.findAll({
            where: {
                sender,
                receiver,
            },
            order: [['createdAt', 'ASC']],
        });
    }
}
