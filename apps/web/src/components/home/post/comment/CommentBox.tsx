import React, { useState } from "react";

import { Comment } from "./types";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";

interface CommentBoxProps {
    initialComments: Comment[];
}

const CommentBox: React.FC<CommentBoxProps> = ({ initialComments }) => {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = useState<string>("");
    const [editCommentId, setEditCommentId] = useState<number | null>(null);
    const [visibleComments, setVisibleComments] = useState<number>(5);

    const handleAddComment = (text: string) => {
        if (text.trim()) {
            if (editCommentId !== null) {
                // Edit existing comment
                setComments((prevComments) =>
                    prevComments.map((comment) =>
                        comment.id === editCommentId
                            ? { ...comment, text }
                            : comment
                    )
                );
                setEditCommentId(null);
            } else {
                // Add new comment
                const newCommentObj: Comment = {
                    id: comments.length + 1,
                    text,
                    user: "Anonymous", // Replace with actual user if available
                    timestamp: new Date().toLocaleString(),
                    likes: 0,
                    dislikes: 0,
                    replies: [],
                };
                setComments([newCommentObj, ...comments]);
            }
            setNewComment("");
        }
    };

    const handleEdit = (commentId: number) => {
        const commentToEdit = comments.find(
            (comment) => comment.id === commentId
        );
        if (commentToEdit) {
            setNewComment(commentToEdit.text);
            setEditCommentId(commentId);
        }
    };

    const handleDelete = (commentId: number) => {
        setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId)
        );
    };

    const handleShowMore = () => {
        setVisibleComments((prev) => prev + 5);
    };

    return (
        <div className="border-t pt-6">
            <CommentInput
                value={newComment}
                onSubmit={handleAddComment}
                isEditing={!!editCommentId}
            />
            <CommentList
                comments={comments.slice(0, visibleComments)}
                onDelete={handleDelete}
                onEdit={handleEdit}
                setComments={setComments}
            />
            {visibleComments < comments.length && (
                <button
                    className="text-blue-500 hover:underline text-sm mb-2"
                    onClick={handleShowMore}
                >
                    Show more
                </button>
            )}
        </div>
    );
};

export default CommentBox;
