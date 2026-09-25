import { useState, useEffect } from "react";

const STORAGE_KEY = "fandomverse_saved_articles";

export default function TrailerCard({ trailer, type = "Trailer" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    const trailerId = trailer.title;

    setSaved(
      stored.some((item) => item.id === trailerId)
    );
  }, [trailer.title]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSaveTrailer = () => {
    const stored = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    const trailerId = trailer.title;

    const alreadySaved = stored.some(
      (item) => item.id === trailerId
    );

    let updated;

    if (alreadySaved) {
      updated = stored.filter(
        (item) => item.id !== trailerId
      );

      setSaved(false);
    } else {
      updated = [
        ...stored,
        {
          ...trailer,
          id: trailerId,
          type: "trailer",
          savedAt: new Date().toISOString(),
          savedName: trailer.title
        }
      ];

      setSaved(true);
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );
  };

  return (
    <>
      <article className="trailer-card">
        <div className="trailer-media">
          <img
            src={trailer.poster}
            alt={trailer.title}
          />

          <span className="trailer-type">
            {type}
          </span>

          <button
            className="trailer-play"
            onClick={() => setIsOpen(true)}
            aria-label={`Play ${trailer.title}`}
          >
            ▶
          </button>

          <button
            className={`trailer-favorite ${
              saved ? "saved" : ""
            }`}
            onClick={handleSaveTrailer}
          >
            {saved ? "Saved" : "☆"}
          </button>
        </div>

        <div className="trailer-content">
          <h2>{trailer.title} — Trailer</h2>

          <p>{trailer.description}</p>

          <div className="trailer-tags">
            <span>{trailer.category}</span>
            <span>{type}</span>
          </div>
        </div>
      </article>

      {isOpen && (
        <div className="trailer-drawer">
          <div
            className="trailer-drawer-backdrop"
            onClick={() => setIsOpen(false)}
          />

          <div className="trailer-video-panel">
            <button
              className="trailer-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close video"
            >
              ×
            </button>

            <div className="trailer-video-wrapper">
              <video
                src={trailer.videoSrc}
                controls
                autoPlay
                playsInline
              />
            </div>

            <div className="trailer-video-info">
              <span>{trailer.category}</span>

              <h2>{trailer.title}</h2>

              <p>{trailer.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}