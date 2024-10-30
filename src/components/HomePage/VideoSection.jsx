import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import "./VideoSection.css";

const VideoSection = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Play/pause toggle
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.muted = false; // Start unmuted
        setIsMuted(false);
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Mute/unmute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Update progress
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  // Seek through video
  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  // Set video duration
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        setDuration(videoRef.current.duration);
      };
    }
  }, []);

  return (
    <section className="video-section">
      <h2>Explore Our <span className="highlight">Fitness App</span></h2>
      <div className="video-container">
        <video
          ref={videoRef}
          src="/HomePageVideo.mp4"
          loop
          playsInline
          muted={isMuted} // Start muted to avoid autoplay restrictions
          onTimeUpdate={handleTimeUpdate} // Update progress bar
        >
          Your browser does not support the video tag.
        </video>
        {!isPlaying && (
          <button className="play-button" onClick={togglePlayPause}>
            <FaPlay />
          </button>
        )}
        <div className="video-controls">
          <button onClick={togglePlayPause} className="control-button">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={toggleMute} className="control-button">
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            className="progress-bar"
            value={progress}
            onChange={handleSeek}
          />
          <span className="time">
            {formatTime(videoRef.current ? videoRef.current.currentTime : 0)} / {formatTime(duration)}
          </span>
        </div>
      </div>
    </section>
  );
};

// Helper function to format time
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export default VideoSection;
