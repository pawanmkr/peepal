// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { Op } from 'sequelize';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat)
    private chatModel: typeof Chat,
  ) {}

  // Save a message in the database (UUID senderId and receiverId)
  async saveMessage(senderId: string, receiverId: string, message: string) {
    const chatData = {
      senderId,
      receiverId,
      message,
    };

    // Create the chat entry in the database
    return this.chatModel.create(chatData);
  }

  // Get chat history between two users (using UUIDs)
  async getChatHistory(userId1: string, userId2: string) {
    return this.chatModel.findAll({
      where: {
        [Op.or]: [
          { senderId: userId1, receiverId: userId2 },
          { senderId: userId2, receiverId: userId1 },
        ],
      },
      order: [['timestamp', 'ASC']], // Sort by timestamp
    });
  }
}
