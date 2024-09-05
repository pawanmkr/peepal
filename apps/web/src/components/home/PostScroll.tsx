import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './PostScroll.css';

const PostScroll: React.FC = () => {
  const [currentPosts, setCurrentPosts] = useState<number>(3); // Show 3 posts initially
  const posts = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/tgbNymZ7vqY",
    "https://www.youtube.com/embed/kJQP7kiw5Fk",
    "https://www.youtube.com/embed/IbJcGMqvg_0",
    "https://www.youtube.com/embed/hT_nvWreIhg",
  ];

  const loadMorePosts = () => {
    setCurrentPosts((prev) => prev + 3); // Load 3 more posts each time
  };

  return (
    <div className="card post-scroll-card shadow-sm">
      <div className="card-body">
        <InfiniteScroll
          dataLength={currentPosts}
          next={loadMorePosts}
          hasMore={currentPosts < posts.length}
          loader={<h4>Loading...</h4>}
        >
          {posts.slice(0, currentPosts).map((post, index) => (
            <div key={index} className="post-card mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <iframe
                    width="100%"
                    height="315"
                    src={post}
                    title={`Post ${index}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default PostScroll;
