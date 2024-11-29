import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io"; // Import close icon
import ChatConversation from "./ChatConversation";

interface ChatUser {
    id: string;
    name: string;
    profilePic: string;
    lastMessage: string;
}

interface ChatHistoryProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ isOpen, onClose }) => {
    const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
    const [isConversationOpen, setIsConversationOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Fetch dummy data for chat users when the chat history opens
            axios
                .get("https://jsonplaceholder.typicode.com/users")
                .then((response) => {
                    const users = response.data.slice(0, 5).map((user: any) => ({
                        id: user.id,
                        name: user.name,
                        profilePic: `https://i.pravatar.cc/150?img=${user.id}`,
                        lastMessage: `Last message from ${user.name}`,
                    }));
                    setChatUsers(users);
                })
                .catch((error) => {
                    console.error("Error fetching chat users:", error);
                });
        }
    }, [isOpen]);

    const handleUserClick = (user: ChatUser) => {
        setSelectedUser(user);
        setIsConversationOpen(true);
    };

    const handleCloseConversation = () => {
        setIsConversationOpen(false);
        setSelectedUser(null);
    };

    const handleCloseAll = () => {
        onClose();
        setSelectedUser(null);
        setIsConversationOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div>
            {/* Chat List */}
            <div
                className="fixed top-16 right-4 bg-white shadow-lg rounded-lg w-96 max-h-[500px] overflow-hidden z-50"
            >
                <div className="flex items-center justify-between bg-blue-500 text-white px-4 py-2">
    <div className="flex items-center">
        <img
            src="https://i.pravatar.cc/50"
            alt="User Profile"
            className="w-8 h-8 rounded-full mr-3"
        />
        <h2 className="text-base font-semibold">Messaging</h2>
    </div>
    <IoMdClose
        size={20}
        className="cursor-pointer hover:text-gray-300"
        onClick={handleCloseAll}
    />
</div>

                
<div className="overflow-y-auto p-4" style={{ maxHeight: "400px" }}>
    {chatUsers.map((user) => (
        <div
            key={user.id}
            className={`flex items-start p-2 mb-3 rounded-md transition cursor-pointer ${
                selectedUser?.id === user.id
                    ? "bg-blue-100 hover:bg-blue-200" // Highlight for selected user
                    : "hover:bg-gray-100" // Default hover for other users
            }`}
            onClick={() => handleUserClick(user)}
        >
            <img
                src={user.profilePic}
                alt={user.name}
                className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-1">
                <h3
                    className={`text-sm font-semibold ${
                        selectedUser?.id === user.id ? "text-blue-600" : "text-gray-800"
                    }`}
                >
                    {user.name}
                </h3>
                <p
                    className={`text-xs ${
                        selectedUser?.id === user.id ? "text-blue-500" : "text-gray-600"
                    }`}
                >
                    {user.lastMessage}
                </p>
            </div>
        </div>
    ))}
</div>

            </div>

            {/* Chat Conversation */}
            {selectedUser && (
                <ChatConversation
                    isOpen={isConversationOpen}
                    onClose={handleCloseAll} // Close both when this is triggered
                    user={selectedUser}
                />
            )}
        </div>
    );
};

export default ChatHistory;
