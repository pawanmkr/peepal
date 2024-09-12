import React from "react";

import { Post } from "./dummy-data";
import VideoSection from "./VideoSection";
import PostMeta from "./PostMeta";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="post-card mb-4">
      <div className="card shadow-sm rounded-lg">
        <div className="card-body">
          {/* Post Title */}
          <h5 className="m-0">{post.title}</h5>

          {/* Post Description */}
          <p className="text-gray-700 m-0">{post.description}</p>
        </div>

        {/* Video Section */}
        <VideoSection videoUrl={post.tutor.video} height="325" width="100%" />
        {/* Post Meta */}
        <PostMeta post={post} />
      </div>
    </div>
  );
};

export default PostCard;
