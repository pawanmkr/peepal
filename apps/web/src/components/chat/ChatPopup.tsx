// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";

// interface ChatPopupProps {
//     onClose: () => void;
// }

// const ChatPopup: React.FC<ChatPopupProps> = ({ onClose }) => {
//     const [message, setMessage] = useState("");
//     const [messages, setMessages] = useState<any[]>([]); // Store chat messages here
//     const [receiverId, setReceiverId] = useState(""); // Receiver's UUID (this can be dynamic)

//     const socket = io("http://localhost:3000"); // Change to your backend URL

//     useEffect(() => {
//         socket.on("receiveMessage", (data) => {
//             // Add received message to chat
//             setMessages((prevMessages) => [...prevMessages, data]);
//         });

//         return () => {
//             socket.off("receiveMessage");
//         };
//     }, []);

//     const handleSendMessage = () => {
//         if (message.trim()) {
//             const senderId = "your-logged-in-uuid"; // Replace with the logged-in user's UUID
//             socket.emit("sendMessage", { senderId, receiverId, message });
//             setMessages((prevMessages) => [
//                 ...prevMessages,
//                 { senderId, message },
//             ]);
//             setMessage("");
//         }
//     };

//     return (
//         <div className="chat-popup fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white w-full max-w-md h-[400px] p-4 rounded-lg">
//                 <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-bold">Chat</h3>
//                     <button onClick={onClose} className="text-red-500">Close</button>
//                 </div>
//                 <div className="chat-messages overflow-y-auto h-[300px] mb-4">
//                     {messages.map((msg, index) => (
//                         <div key={index} className="message mb-2">
//                             <p><strong>{msg.senderId}:</strong> {msg.message}</p>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="flex">
//                     <input
//                         type="text"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                         placeholder="Type your message"
//                         className="border p-2 w-full"
//                     />
//                     <button
//                         onClick={handleSendMessage}
//                         className="ml-2 bg-blue-500 text-white p-2"
//                     >
//                         Send
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ChatPopup;
