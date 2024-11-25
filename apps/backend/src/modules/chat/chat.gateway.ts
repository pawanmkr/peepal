import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
    MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(3001, { cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private readonly logger = new Logger(ChatGateway.name);
    private activeUsers: Map<string, Socket> = new Map(); // Maps userId -> socket

    afterInit(server: Server) {
        this.logger.log('WebSocket server initialized and running');
    }

    /**
     * Handle a new client connection.
     * @param client - The socket client that connected.
     */
    async handleConnection(@ConnectedSocket() client: Socket): Promise<void> {
        // Extract userId from the query parameter (or another source like a token)
        const userId = client.handshake.query.userId as string;

        if (userId) {
            this.activeUsers.set(userId, client);
            this.logger.log(`User ${userId} connected with socket ID ${client.id}`);
            client.emit('registered', { userId, message: 'You are now online.' });
        } else {
            this.logger.error('User ID is missing from connection');
            client.disconnect(); // Disconnect if no userId is provided
        }
    }

    /**
     * Handle client disconnection.
     * @param client - The socket client that disconnected.
     */
    async handleDisconnect(@ConnectedSocket() client: Socket): Promise<void> {
        this.logger.log(`Client disconnected: ${client.id}`);

        // Remove the user from active users
        this.activeUsers.forEach((socket, userId) => {
            if (socket.id === client.id) {
                this.activeUsers.delete(userId);
                this.logger.log(`User ${userId} disconnected.`);
            }
        });
    }

    /**
     * Handle sending a message.
     */
    @SubscribeMessage('sendMessage')
    async handleSendMessage(
        @MessageBody() data: { sender: string; receiver: string; message: string },
        @ConnectedSocket() client: Socket
    ): Promise<void> {
        this.logger.log(`Message from ${data.sender} to ${data.receiver}: ${data.message}`);

        // Ensure receiver is connected (check if receiver is in active users)
        const receiverSocket = this.activeUsers.get(data.receiver);
        if (receiverSocket) {
            // Send message to receiver
            receiverSocket.emit('receiveMessage', {
                sender: data.sender,
                message: data.message,
            });

            // Optionally send a confirmation to the sender
            client.emit('messageSent', { status: 'delivered', message: data.message });
        } else {
            // If the receiver is not connected, handle it (e.g., by sending a failure message to sender)
            client.emit('messageFailed', { reason: 'User is offline' });
        }
    }
}
