import React from "react";

interface ReplyBoxProps {
    replyText: string;
    setReplyText: React.Dispatch<React.SetStateAction<string>>;
    addReply: (text: string) => void;
}

const ReplyBox: React.FC<ReplyBoxProps> = ({
    replyText,
    setReplyText,
    addReply,
}) => {
    return (
        <div className="mt-4">
            <textarea
                className="p-2 border border-gray-300 rounded-md w-full resize-none"
                rows={2}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Add a reply..."
            />
            <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => addReply(replyText)}
            >
                Reply
            </button>
        </div>
    );
};

export default ReplyBox;
