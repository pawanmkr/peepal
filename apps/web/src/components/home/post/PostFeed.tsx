import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "lucide-react";

import PostCard from "./PostCard";
import { posts as dummyPosts, posts } from "./dummy-data"; // Keep the dummy posts as default
import SearchResultReport from "../SearchResultReport";

interface PostFeedProps {
    query?: string;
    professionalId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ query, professionalId }) => {
    const [currentPosts, setCurrentPosts] = useState<any[]>(dummyPosts); // Initialize with dummy posts
    const [currentPostsCount, setCurrentPostsCount] = useState<number>(10); // Display 10 posts initially
    const [loading, setLoading] = useState<boolean>(false); // Loading state for API fetch

    // Simulate API call with query
    useEffect(() => {
        if (query) {
            // If query exists, simulate API call
            setLoading(true);
            setTimeout(() => {
                setCurrentPosts(posts); // Update currentPosts based on query
                setLoading(false);
            }, 1000); // Simulate 1 second delay for fetching
        } else {
            // If no query, use default posts
            setCurrentPosts(dummyPosts);
        }
    }, [query]);

    // Function to load more posts on scroll
    const loadMorePosts = () => {
        setCurrentPostsCount((prev) => prev + 3); // Increment post count by 3
    };

    return (
        <div className="relative min-w-full md:min-w-[600px]">
            {/* Search results */}
            {location.pathname === "/search" && query && (
                <SearchResultReport
                    totalResultsFound={posts.length}
                    query={query}
                    postParam={true}
                />
            )}

            {/* Scrollable Post Section */}
            <div
                id="scrollableDiv"
                className="overflow-y-scroll h-full"
                style={{
                    scrollbarWidth: "none" /* Firefox */,
                    msOverflowStyle: "none" /* Internet Explorer 10+ */,
                }}
            >
                {loading ? (
                    <div className="flex justify-center my-4">
                        <Loader className="animate-spin" size={24} />
                    </div>
                ) : currentPosts && currentPosts.length > 0 ? (
                    <InfiniteScroll
                        dataLength={currentPostsCount} // Length of currently visible posts
                        next={loadMorePosts}
                        hasMore={currentPostsCount < currentPosts.length} // Check if more posts are available
                        scrollableTarget="scrollableDiv"
                        loader={
                            <div className="flex justify-center my-4">
                                <div className="loader border-t-2 border-b-2 border-gray-500 w-6 h-6 rounded-full animate-spin"></div>
                            </div>
                        }
                    >
                        {currentPosts
                            .slice(0, currentPostsCount)
                            .map((post) => (
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

export default PostFeed;
