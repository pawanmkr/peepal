// chat.gateway.ts
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { v4 as uuidv4 } from 'uuid';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server!: Server;
  private activeUsers = new Map<string, string>(); // Map userId -> SocketId (using UUID)

  constructor(private readonly chatService: ChatService) {}

  // Handle new client connections
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Handle client disconnections
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    const userId = [...this.activeUsers.entries()].find(([_, socketId]) => socketId === client.id)?.[0];
    if (userId) {
      this.activeUsers.delete(userId);
    }
  }

  // Handle user joining the WebSocket (using UUID userId)
  @SubscribeMessage('join')
  handleJoin(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    this.activeUsers.set(userId, client.id);
    console.log(`User ${userId} joined with socket ${client.id}`);
  }

  // Handle sending a message (senderId and receiverId are UUIDs)
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() { senderId, receiverId, message }: { senderId: string, receiverId: string, message: string },
  ) {
    // Save the message to the database
    await this.chatService.saveMessage(senderId, receiverId, message);

    // Get the socket ID of the receiver and send them the message
    const receiverSocketId = this.activeUsers.get(receiverId);
    if (receiverSocketId) {
      // Emit the message to the receiver
      this.server.to(receiverSocketId).emit('receiveMessage', { senderId, message });
      console.log(`Message from ${senderId} to ${receiverId}: ${message}`);
    } else {
      console.log(`Receiver ${receiverId} not connected`);
    }
  }
}
