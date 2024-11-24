import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './chat.model';

@Module({
  imports: [SequelizeModule.forFeature([Chat])],
  providers: [ChatService, ChatGateway],
  exports: [ChatService], // Export ChatService if needed elsewhere
})
export class ChatModule {}
