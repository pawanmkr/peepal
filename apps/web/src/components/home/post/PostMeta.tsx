// import React, { useState } from "react";
// import dayjs from "dayjs";
// import { initialComments, Post } from "./dummy-data";
// import { useNavigate } from "react-router-dom";
// import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
// import CommentBox from "./comment/CommentBox"; // Import CommentBox

// interface PostMetaProps {
//     post: Post;
// }

// export default function PostMeta({ post }: PostMetaProps) {
//     const navigate = useNavigate();
//     const [showComments, setShowComments] = useState(false);

//     const gotoTutorProfile = (id: string) => {
//         navigate(`/user/${id}`);
//     };

//     return (
//         <div className="flex flex-col text-gray-500 px-3 py-2">
//             <div className="flex justify-between items-center">
//                 <div className="flex gap-x-2 items-center">
//                     <button className="flex items-center text-gray-500 hover:text-blue-500">
//                         <ThumbsUp className="w-5 h-5" />
//                         <span className="ml-1">
//                             {Math.floor(Math.random() * 100)}
//                         </span>
//                     </button>
//                     <button className="flex items-center text-gray-500 hover:text-red-500">
//                         <ThumbsDown className="w-5 h-5" />
//                         <span className="ml-1">
//                             {Math.floor(Math.random() * 50)}
//                         </span>
//                     </button>
//                     <button
//                         className="flex items-center text-gray-500 hover:text-green-500"
//                         onClick={() => setShowComments(!showComments)}
//                     >
//                         <MessageCircle className="w-5 h-5" />
//                         <span className="ml-1">
//                             {Math.floor(Math.random() * 30)}
//                         </span>
//                     </button>
//                 </div>
//                 <div className="flex gap-x-4 items-center">
//                     <p
//                         className="cursor-pointer m-0"
//                         onClick={() => gotoTutorProfile(post.user.id)}
//                     >
//                         @{post.user.user.username}
//                     </p>
//                     <p className="m-0">{dayjs().diff(post.date, "day")}d ago</p>
//                     <p className="m-0">
//                         {Math.floor(Math.random() * 1000) + 100} views
//                     </p>
//                 </div>
//             </div>

//             {showComments && (
//                 <div className="mt-4 transition-all duration-300 ease-in-out">
//                     <CommentBox initialComments={initialComments} />
//                 </div>
//             )}
//         </div>
//     );
// }
