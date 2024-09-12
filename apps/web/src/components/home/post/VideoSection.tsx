import React from "react";

interface VideoSectionProps {
  videoUrl: string;
  height: string;
  width: string;
  autoPlay?: boolean; // Optional prop to enable autoplay
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoUrl,
  height,
  width,
  autoPlay = false, // Default to autoplay false
}) => {
  // If autoPlay is enabled, add autoplay and muted parameters to the video URL
  const modifiedUrl = autoPlay ? `${videoUrl}?&autoplay=1&mute=0` : videoUrl;

  return (
    <div className="rounded-md overflow-hidden">
      <iframe
        width={width}
        height={height}
        src={modifiedUrl}
        title="Post Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoSection;
