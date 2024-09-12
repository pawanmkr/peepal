import React from "react";

import CommentItem from "./CommentItem";
import { Comment } from "./types";

export interface CommentListProps {
    comments: Comment[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const CommentList: React.FC<CommentListProps> = ({
    comments,
    onDelete,
    onEdit,
    setComments,
}) => {
    return (
        <div>
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    setComments={setComments}
                    isReply={false}
                />
            ))}
        </div>
    );
};

export default CommentList;
