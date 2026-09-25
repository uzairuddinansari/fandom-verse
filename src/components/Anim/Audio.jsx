import React, { useState } from "react";
import "../../styles/Audio.css";
import video from "../../assets/Anim_audio/prodcast.mp4"
import img from "../../assets/Anim_audio/Audio.jpeg"

const Audio = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="audio-section">
      <div className="audio-card">
        <img
          src={img}
          alt="Anime Podcast"
          className="audio-thumbnail"
        />

        <div className="audio-overlay"></div>

        <div
          className={`audio-play-wrapper ${isOpen ? "audio-open" : ""}`}
          onClick={() => setIsOpen(true)}
        >
          <div className="audio-play">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 5.5V18.5L18 12L8 5.5Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <span className="audio-tooltip">Click Me</span>
        </div>

        <div
          className={`audio-video-box ${
            isOpen ? "audio-video-active" : ""
          }`}
        >
          <button
            type="button"
            className="audio-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close video"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 6L18 18M18 6L6 18" />
            </svg>
          </button>

          <video className="audio-video" controls autoPlay>
            <source
              src={video}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  );
};

export default Audio;