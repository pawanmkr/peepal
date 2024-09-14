import React, { useState } from "react";

interface CommentInputProps {
    value: string;
    onSubmit: (text: string) => void;
    isEditing?: boolean;
}

const CommentInput: React.FC<CommentInputProps> = ({
    value,
    onSubmit,
    isEditing,
}) => {
    const [text, setText] = useState(value);

    const handleSubmit = () => {
        onSubmit(text);
        setText("");
    };

    return (
        <div className="flex justify-between items-center mb-4">
            <textarea
                className="p-2 border border-gray-300 rounded-md w-[70%] resize-none"
                rows={1}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a comment..."
            />
            <button
                className="w-[25%] bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={handleSubmit}
            >
                {isEditing ? "Update Comment" : "Comment"}
            </button>
        </div>
    );
};

export default CommentInput;
