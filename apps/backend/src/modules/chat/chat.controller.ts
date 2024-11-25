import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get()
    async getChatHistory(@Query('sender') sender: string, @Query('receiver') receiver: string) {
        return this.chatService.getMessages(sender, receiver);
    }
}
