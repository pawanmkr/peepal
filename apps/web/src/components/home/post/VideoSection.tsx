import React from "react";

interface VideoSectionProps {
  videoUrl: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({ videoUrl }) => {
  return (
    <div className="rounded-sm overflow-hidden">
      <iframe
        width="100%"
        height="300"
        src={videoUrl}
        title="Post Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        // loading="lazy"
      />
    </div>
  );
};

export default VideoSection;
