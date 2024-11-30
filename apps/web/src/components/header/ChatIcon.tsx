import { RiChatSmile3Line } from "react-icons/ri";

const ChatIcon: React.FC = () => {
    return (
        <RiChatSmile3Line
            className="h-6 w-6 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            size={24} // Icon size
        />
    );
};

export default ChatIcon;
