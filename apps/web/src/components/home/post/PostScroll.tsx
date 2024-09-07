import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import PostCard from "./PostCard";
import { Post } from "./dummy-data";

interface IPostScroll {
  posts: Post[];
}

export const PostScroll: React.FC<IPostScroll> = ({ posts }) => {
  const [currentPostsCount, setCurrentPostsCount] = useState<number>(10); // Display 10 posts initially

  // Function to load more posts on scroll
  const loadMorePosts = () => {
    setCurrentPostsCount((prev) => prev + 3); // Increment post count by 3
  };

  return (
    <div className="relative">
      {/* Scrollable Post Section */}
      <div
        id="scrollableDiv"
        className="overflow-y-scroll h-full"
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* Internet Explorer 10+ */,
        }}
      >
        {/* Ensure posts exist and are an array before rendering */}
        {posts && posts.length > 0 ? (
          <InfiniteScroll
            dataLength={currentPostsCount} // Length of currently visible posts
            next={loadMorePosts}
            hasMore={currentPostsCount < posts.length} // Check if more posts are available
            scrollableTarget="scrollableDiv"
            loader={
              <div className="flex justify-center my-4">
                <div className="loader border-t-2 border-b-2 border-gray-500 w-6 h-6 rounded-full animate-spin"></div>
              </div>
            }
          >
            {posts.slice(0, currentPostsCount).map((post, index) => (
              <PostCard key={post.id} post={post} />
            ))}
          </InfiniteScroll>
        ) : (
          <p className="text-center mt-4">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default PostScroll;
