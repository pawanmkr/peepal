// src/chat/chat.controller.ts
import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  async saveMessage(@Body() body: { senderId: string; receiverId: string; message: string }) {
    return this.chatService.saveMessage(body.senderId, body.receiverId, body.message);
  }

  @Get('history')
  async getChatHistory(@Query('userId1') userId1: string, @Query('userId2') userId2: string) {
    return this.chatService.getChatHistory(userId1, userId2);
  }
}
