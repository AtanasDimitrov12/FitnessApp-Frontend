import React, { useRef } from "react";
import "./VideoSection.css";

const VideoSection = () => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = false; // Ensure video is unmuted
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <section className="video-section">
      <h2>Explore Our <span className="highlight">Fitness App</span></h2>
      <div className="video-container">
        <video
          ref={videoRef}
          src="/HomePageVideo.mp4"  // Path to video in public folder
          loop
          playsInline
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default VideoSection;
