import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLightbulb,
  FaCheckCircle,
  FaArrowRight,
  FaInfoCircle,
} from "react-icons/fa";
import { Topic, topics } from "./post/dummy-data";

const TopicOfTheDay: React.FC = () => {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const infoIconRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Randomly pick a topic from the data every day (simulate daily topic)
    const todayTopic = topics[Math.floor(Math.random() * topics.length)];
    setTopic(todayTopic);
  }, []);

  function handleTopicClick(keyword: string) {
    // Navigate to the search results page with the clicked keyword
    navigate(`/search?q=${encodeURIComponent(keyword)}`);
  }

  return (
    <div className="card shadow-sm mb-4 bg-white rounded-lg">
      <div className="card-body">
        <h5 className="card-title text-lg mb-3 flex items-center">
          Did You Know About? <FaLightbulb className="ml-2 text-yellow-500" />
        </h5>
        {topic ? (
          <>
            <div className="flex items-center relative">
              <h6 className="text-blue-600 text-lg font-semibold m-0 flex-grow">
                {topic.name}
              </h6>
              <div
                ref={infoIconRef}
                className="relative cursor-pointer ml-2 text-gray-500"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
              >
                <FaInfoCircle />
                {showTooltip && (
                  <div className="absolute -top-2 right-full mt-2 p-2 w-64 bg-gray-700 text-white text-sm rounded-lg shadow-md">
                    {topic.description}
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-500 italic text-sm">{topic.category}</p>
            <ul className="list-none p-0 mt-2">
              {topic.benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="py-1 flex items-center text-sm text-gray-700"
                >
                  <div className="">
                    <FaCheckCircle className="mr-2 text-green-500" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>
            <div
              className="mt-4 flex items-center text-blue-500 hover:underline cursor-pointer"
              onClick={() => handleTopicClick(topic.name)}
            >
              <FaArrowRight className="mr-2" /> Find experts
            </div>
          </>
        ) : (
          <p className="text-gray-500">Loading today's topic...</p>
        )}
      </div>
    </div>
  );
};

export default TopicOfTheDay;
