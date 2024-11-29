import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineSend } from "react-icons/ai"; // Send Icon
import { IoMdChatbubbles } from "react-icons/io"; // Chat Input Icon

interface Message {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
}

interface ChatConversationProps {
    isOpen: boolean;
    onClose: () => void;
    user: { id: string; name: string; profilePic: string } | null;
}

const ChatConversation: React.FC<ChatConversationProps> = ({
    isOpen,
    onClose,
    user,
}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (isOpen && user) {
            axios
                .get("https://jsonplaceholder.typicode.com/comments")
                .then((response) => {
                    const chatMessages = response.data.slice(0, 10).map((msg: any, index: number) => ({
                        id: msg.id,
                        sender: index % 2 === 0 ? user.name : "You",
                        content: msg.body,
                        timestamp: new Date().toLocaleTimeString(),
                    }));
                    setMessages(chatMessages);
                })
                .catch((error) => {
                    console.error("Error fetching messages:", error);
                });
        }
    }, [isOpen, user]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages((prev) => [
                ...prev,
                {
                    id: (prev.length + 1).toString(),
                    sender: "You",
                    content: newMessage.trim(),
                    timestamp: new Date().toLocaleTimeString(),
                },
            ]);
            setNewMessage("");
        }
    };

    if (!isOpen || !user) return null;

    return (                
        <div className="fixed top-16 right-[430px] bg-white shadow-lg rounded-lg w-96 max-h-[450px] flex flex-col z-50">
            {/* Header */}
            <div className="flex items-center bg-yellow-500 text-white p-2">
    <img
        src={user.profilePic}
        alt={user.name}
        className="w-8 h-8 rounded-full mr-2" // Reduced size for the profile picture
    />
    <h2 className="text-sm font-semibold">{user.name}</h2> {/* Adjusted text size */}
</div>

           
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${
                            message.sender === "You" ? "justify-end" : "justify-start"
                        } mb-3`}
                    >
                        <div
                            className={`p-3 rounded-lg ${
                                message.sender === "You"
                                    ? "bg-blue-100 text-right"
                                    : "bg-gray-200 text-left"
                            }`}
                            style={{ maxWidth: "75%" }}
                        >
                            <p className="text-sm text-gray-800">{message.content}</p>
                            <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                        </div>
                    </div>
                ))}
            </div>
           {/* Input Area (Sticky) */}
<div className="sticky bottom-0 bg-white border-t border-gray-300 p-2 flex items-center">
    <div className="relative flex-1">
        <input
            type="text"
            className="w-full border border-gray-300 rounded-lg pl-10 p-2 focus:outline-none"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter" && newMessage.trim()) {
                    handleSendMessage();
                }
            }}
        />
    </div>
    <button
        onClick={handleSendMessage}
        disabled={!newMessage.trim()}
        className={`ml-2 bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center justify-center ${
            !newMessage.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
    >
        <AiOutlineSend size={20} />
    </button>
</div>

        </div>
    );
};

export default ChatConversation;
