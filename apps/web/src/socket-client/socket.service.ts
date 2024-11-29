import { io, Socket } from "socket.io-client";

export class SocketService {
  private socket: Socket;

  constructor() {
    // Connect to the socket server (replace URL with your backend server URL)
    this.socket = io("http://localhost:3000");
  }

  // Method to establish a socket connection for chat
  connectToChat(userId: string) {
    // Join the chat room using the user's ID
    this.socket.emit('join', userId);
  }

  // Method to send a message to a specific user
  sendMessage(userId: string, message: string) {
    // Emit 'send-message' event with the recipient userId and message
    this.socket.emit('send-message', { userId, message });
  }

  // Listen for incoming messages
  onReceiveMessage(callback: (message: string) => void) {
    // Listen for 'receive-message' event and call the provided callback
    this.socket.on('receive-message', callback);
  }

  // Listen for new chat users (for the conversation list)
  onNewChatUser(callback: (userId: string) => void) {
    // Listen for 'new-chat-user' event and trigger the callback when a new user joins
    this.socket.on('new-chat-user', callback);
  }

  // Close the socket connection
  disconnect() {
    // Disconnect from the server
    this.socket.disconnect();
  }
}
