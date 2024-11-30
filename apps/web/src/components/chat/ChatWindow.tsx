// import React, { useState, useEffect, useRef } from "react";

// interface ChatWindowProps {
//     userId: number;
//     closeChat: () => void;
//     loggedInUser: { id: number; name: string; profilePic: string };
//     chatUser: { id: number; name: string; profilePic: string };
// }

// const ChatWindow: React.FC<ChatWindowProps> = ({ userId, closeChat, loggedInUser, chatUser }) => {
//     const [messages, setMessages] = useState([
//         { senderId: loggedInUser.id, text: "Hello!" },
//         { senderId: chatUser.id, text: "Hi, how are you?" },
//         { senderId: loggedInUser.id, text: "Let's meet tomorrow." },
//     ]);
//     const [newMessage, setNewMessage] = useState("");
//     const [isTyping, setIsTyping] = useState(false);

//     const messagesEndRef = useRef<HTMLDivElement>(null);

//     const sendMessage = () => {
//         if (newMessage.trim()) {
//             setMessages((prev) => [
//                 ...prev,
//                 { senderId: loggedInUser.id, text: newMessage },
//             ]);
//             setNewMessage("");
//         }
//     };

//     const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setNewMessage(e.target.value);
//         setIsTyping(true);

//         // Reset typing indicator after 1 second
//         clearTimeout(debounceTimeout);
//         const debounceTimeout = setTimeout(() => setIsTyping(false), 1000);
//     };

//     useEffect(() => {
//         if (messagesEndRef.current) {
//             messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//         }
//     }, [messages]);

//     return (
//         <div className="bg-white shadow-lg rounded-lg p-4 w-96 absolute left-[-400px] bottom-4 right-4 z-50">
//             {/* Header with Close Icon */}
//             <div className="flex justify-between items-center mb-4 border-b pb-2">
//                 <div className="flex items-center">
//                     <img
//                         src={chatUser.profilePic}
//                         alt={`${chatUser.name}'s profile`}
//                         className="w-8 h-8 rounded-full mr-2"
//                     />
//                     <p className="text-lg font-semibold">{chatUser.name}</p>
//                 </div>
//                 <button
//                     className="text-gray-500 hover:text-red-500"
//                     onClick={closeChat}
//                     aria-label="Close Chat"
//                 >
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-6 w-6"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M6 18L18 6M6 6l12 12"
//                         />
//                     </svg>
//                 </button>
//             </div>

//             {/* Messages Section */}
//             <div className="flex flex-col space-y-3 max-h-64 overflow-y-auto mb-4">
//                 {messages.map((msg, index) => (
//                     <div
//                         key={index}
//                         className={`flex ${
//                             msg.senderId === loggedInUser.id ? "justify-end" : "justify-start"
//                         }`}
//                     >
//                         {msg.senderId !== loggedInUser.id && (
//                             <img
//                                 src={chatUser.profilePic}
//                                 alt={`${chatUser.name}'s profile`}
//                                 className="w-6 h-6 rounded-full mr-2"
//                             />
//                         )}
//                         <div
//                             className={`p-2 rounded-lg ${
//                                 msg.senderId === loggedInUser.id
//                                     ? "bg-blue-500 text-white"
//                                     : "bg-gray-200 text-gray-800"
//                             }`}
//                         >
//                             <p className="text-sm">{msg.text}</p>
//                         </div>
//                     </div>
//                 ))}
//                 {/* Auto Scroll to the latest message */}
//                 <div ref={messagesEndRef} />
//             </div>

//             {/* Typing Indicator */}
//             {isTyping && (
//                 <div className="flex justify-start mt-2 text-sm text-gray-500">
//                     <span>{chatUser.name} is typing...</span>
//                 </div>
//             )}

//             {/* Message Input */}
//             <div className="flex mt-4">
//                 <input
//                     className="flex-grow border rounded-l px-2 py-1 focus:outline-none"
//                     type="text"
//                     placeholder="Type a message"
//                     value={newMessage}
//                     onChange={handleTyping}
//                 />
//                 <button
//                     className="bg-blue-500 text-white px-4 py-1 rounded-r hover:bg-blue-600"
//                     onClick={sendMessage}
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ChatWindow;
