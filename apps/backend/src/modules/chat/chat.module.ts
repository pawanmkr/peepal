import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { ChatGateway } from './chat.gateway';

@Module({
    imports: [SequelizeModule.forFeature([Chat])],
    providers: [ChatService, ChatGateway],
    controllers: [ChatController],
})
export class ChatModule {}
