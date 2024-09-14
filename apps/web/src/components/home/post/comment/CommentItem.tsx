import React, { useState, useRef, useEffect } from "react";
import { ThumbsUp, ThumbsDown, Ellipsis } from "lucide-react";
import ReplyBox from "./ReplyBox";
import { Comment } from "./types";

interface CommentItemProps {
    comment: Comment;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    isReply: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({
    comment,
    onDelete,
    onEdit,
    setComments,
    isReply,
}) => {
    const [replyToId, setReplyToId] = useState<number | null>(null);
    const [replyText, setReplyText] = useState<string>("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLike = () => {
        setComments((prevComments) =>
            prevComments.map((c) =>
                c.id === comment.id ? { ...c, likes: c.likes + 1 } : c
            )
        );
    };

    const handleDislike = () => {
        setComments((prevComments) =>
            prevComments.map((c) =>
                c.id === comment.id ? { ...c, dislikes: c.dislikes + 1 } : c
            )
        );
    };

    const addReply = (text: string) => {
        const newReply: Comment = {
            id: Date.now(),
            text,
            user: "Anonymous",
            timestamp: new Date().toLocaleString(),
            likes: 0,
            dislikes: 0,
        };

        const addReplyToComment = (comments: Comment[]): Comment[] => {
            return comments.map((c) =>
                c.id === comment.id
                    ? { ...c, replies: [...(c.replies || []), newReply] }
                    : c
            );
        };

        setComments((prevComments) => addReplyToComment(prevComments));
        setReplyText("");
        setReplyToId(null);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div key={comment.id} className="mt-3 relative">
            <div className="flex items-center justify-between">
                <p className="font-semibold m-0 text-black">{comment.user}</p>
                <div className="flex gap-x-4 items-center">
                    <p className="text-xs text-gray-500 m-0">
                        {comment.timestamp}
                    </p>
                    <Ellipsis
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    />
                    {dropdownOpen && (
                        <div
                            className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                            ref={dropdownRef}
                        >
                            <button
                                className="w-full px-2 py-1 text-left hover:bg-gray-100"
                                onClick={() => onEdit(comment.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="w-full px-2 py-1 text-left hover:bg-gray-100"
                                onClick={() => onDelete(comment.id)}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <p className="m-0">{comment.text}</p>
            <div className="flex items-center gap-x-4 mt-2">
                <button
                    className="flex items-center text-gray-500 hover:text-blue-500"
                    onClick={handleLike}
                >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="ml-1">{comment.likes}</span>
                </button>
                <button
                    className="flex items-center text-gray-500 hover:text-red-500"
                    onClick={handleDislike}
                >
                    <ThumbsDown className="w-4 h-4" />
                    <span className="ml-1">{comment.dislikes}</span>
                </button>
                {!isReply && (
                    <button
                        className="flex items-center text-gray-500 hover:underline"
                        onClick={() =>
                            setReplyToId(
                                replyToId === comment.id ? null : comment.id
                            )
                        }
                    >
                        Reply
                    </button>
                )}
            </div>
            {replyToId === comment.id && (
                <ReplyBox
                    replyText={replyText}
                    setReplyText={setReplyText}
                    addReply={addReply}
                />
            )}
            {comment.replies && (
                <div className="ml-8 mt-2">
                    {comment.replies.map((reply) => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            setComments={setComments}
                            isReply={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentItem;
