import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type Tutor = {
  id: string;
  userId: string;
  description: string;
  experience: number;
  skills: string;
  rating: number;
  video: string;
  location: string;
  languages: string;
  availability: string;
  currency: string;
  charge: number;
  chargeType: string;
  days: string;
  startTime: string;
  endTime: string;
};

const PostScroll: React.FC = () => {
  const [currentPosts, setCurrentPosts] = useState<number>(3); // Show 3 posts initially
  const posts: Tutor[] = [
    {
      id: "1",
      userId: "tutor1",
      description: "I am a professional tutor with 10 years of experience.",
      experience: 10,
      skills: "Problem solving, Communication, Patience",
      rating: 4.8,
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      location: "Delhi, India",
      languages: "English, Hindi",
      availability: "Weekdays",
      currency: "INR",
      charge: 40,
      chargeType: "hourly",
      days: "Monday, Wednesday, Friday",
      startTime: "09:15:00",
      endTime: "05:00:00",
    },
    {
      id: "2",
      userId: "tutor2",
      description: "Expert in mathematics with a passion for teaching.",
      experience: 5,
      skills: "Mathematical concepts, Analytical thinking",
      rating: 4.5,
      video: "https://www.youtube.com/embed/tgbNymZ7vqY",
      location: "Mumbai, India",
      languages: "Hindi, English",
      availability: "Weekends",
      currency: "INR",
      charge: 50,
      chargeType: "hourly",
      days: "Saturday, Sunday",
      startTime: "10:00:00",
      endTime: "06:00:00",
    },
    {
      id: "3",
      userId: "tutor3",
      description: "Physics teacher with 7 years of experience.",
      experience: 7,
      skills: "Physics concepts, Practical knowledge",
      rating: 4.9,
      video: "https://www.youtube.com/embed/kJQP7kiw5Fk",
      location: "Bangalore, India",
      languages: "English, Kannada",
      availability: "Available on weekdays",
      currency: "INR",
      charge: 60,
      chargeType: "hourly",
      days: "Monday to Friday",
      startTime: "08:00:00",
      endTime: "04:00:00",
    },
    {
      id: "4",
      userId: "tutor4",
      description:
        "Chemistry tutor with in-depth knowledge of organic chemistry.",
      experience: 6,
      skills: "Organic Chemistry, Patience, Communication",
      rating: 4.7,
      video: "https://www.youtube.com/embed/IbJcGMqvg_0",
      location: "Chennai, India",
      languages: "English, Tamil",
      availability: "Available on weekends",
      currency: "INR",
      charge: 70,
      chargeType: "hourly",
      days: "Saturday, Sunday",
      startTime: "10:00:00",
      endTime: "05:00:00",
    },
    {
      id: "5",
      userId: "tutor5",
      description: "Biology tutor with a focus on genetics and biotechnology.",
      experience: 8,
      skills: "Genetics, Biotechnology, Research",
      rating: 4.6,
      video: "https://www.youtube.com/embed/9bZkp7q19f0",
      location: "Pune, India",
      languages: "English, Marathi",
      availability: "Weekdays",
      currency: "INR",
      charge: 80,
      chargeType: "hourly",
      days: "Monday to Friday",
      startTime: "09:00:00",
      endTime: "05:00:00",
    },
    {
      id: "6",
      userId: "tutor5",
      description: "Biology tutor with a focus on genetics and biotechnology.",
      experience: 8,
      skills: "Genetics, Biotechnology, Research",
      rating: 4.6,
      video: "https://www.youtube.com/embed/9bZkp7q19f0",
      location: "Pune, India",
      languages: "English, Marathi",
      availability: "Weekdays",
      currency: "INR",
      charge: 80,
      chargeType: "hourly",
      days: "Monday to Friday",
      startTime: "09:00:00",
      endTime: "05:00:00",
    },
    {
      id: "7",
      userId: "tutor5",
      description: "Biology tutor with a focus on genetics and biotechnology.",
      experience: 8,
      skills: "Genetics, Biotechnology, Research",
      rating: 4.6,
      video: "https://www.youtube.com/embed/9bZkp7q19f0",
      location: "Pune, India",
      languages: "English, Marathi",
      availability: "Weekdays",
      currency: "INR",
      charge: 80,
      chargeType: "hourly",
      days: "Monday to Friday",
      startTime: "09:00:00",
      endTime: "05:00:00",
    },
    // Add more demo data here
  ];

  const loadMorePosts = () => {
    setCurrentPosts((prev) => prev + 3); // Load 3 more posts each time
  };

  return (
    <div className="relative h-screen">
      {/* Scrollable Post Section */}
      <div
        id="scrollableDiv"
        className="overflow-y-scroll h-full"
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* Internet Explorer 10+ */,
        }}
      >
        <InfiniteScroll
          dataLength={currentPosts}
          next={loadMorePosts}
          hasMore={currentPosts < posts.length}
          scrollableTarget="scrollableDiv"
          loader={
            <div className="flex justify-center my-4">
              <div className="loader border-t-2 border-b-2 border-gray-500 w-6 h-6 rounded-full animate-spin"></div>
            </div>
          }
        >
          {posts.slice(0, currentPosts).map((post, index) => (
            <div key={index} className="post-card mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  {/* Video */}
                  <iframe
                    width="100%"
                    height="315"
                    src={post.video}
                    title={`Post ${index}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  {/* Tutor Information */}
                  <div className="tutor-info mt-3">
                    <h5 className="text-lg font-semibold">
                      {post.description}
                    </h5>
                    <p className="text-sm text-gray-600">
                      <strong>Experience:</strong> {post.experience} years
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Skills:</strong> {post.skills}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Languages:</strong> {post.languages}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Location:</strong> {post.location}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Availability:</strong> {post.availability} |{" "}
                      {post.days} ({post.startTime} - {post.endTime})
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Charges:</strong> {post.currency} {post.charge}/
                      {post.chargeType}
                    </p>
                    <div className="rating mt-2">
                      <span className="text-sm font-semibold text-yellow-500">
                        Rating: {post.rating} ⭐
                      </span>
                    </div>
                  </div>
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
