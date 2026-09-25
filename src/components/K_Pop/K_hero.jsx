
import React, { useState } from 'react';
import '../../styles/K_hero.css';

const kpopTracks = [
  {
    id: 1,
    title: "DYNAMITE",
    artist: "Jungkook (BTS)",
    album: "BE / Single",
    rank: "#01 TOP CHART",
    duration: "3:19",
    artistImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "THE ALBUM",
    artist: "BLACKPINK",
    album: "The Album",
    rank: "#02 TRENDING",
    duration: "3:02",
    artistImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "SAVAGE",
    artist: "aespa",
    album: "Savage - 1st Mini Album",
    rank: "#03 NEW DROP",
    duration: "3:58",
    artistImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "SUPER SHY",
    artist: "NewJeans",
    album: "Get Up",
    rank: "#04 HOT HIT",
    duration: "2:34",
    artistImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
  }
];

const K_hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeTrack = kpopTracks[currentIndex];

  const handleNextTrack = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % kpopTracks.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSelectTrack = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const scrollPlaylist = [...kpopTracks, ...kpopTracks];

  return (
    <div className="kpop-wrapper">
      <section className="kpop-hero-container">

        <div className="kpop-spotlight-panel">

          <div className="soundwave-top-banner">
            <h1 className="soundwave-logo-text">K-POP SOUNDWAVE</h1>

            <div className={`soundwave-bars ${isPlaying ? 'playing' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="main-artist-card">
            <div
              className="artist-portrait"
              style={{ backgroundImage: `url(${activeTrack.artistImage})` }}
            >
              <span className="live-status-pill">
                <span className={`live-dot ${isPlaying ? 'active' : ''}`}></span>
                {isPlaying ? 'PLAYING' : 'LIVE NOW'}
              </span>
            </div>

            <div className="artist-meta-content">
              <span className="fan-voting-tag">14.5K WATCHING</span>

              <p className="currently-playing-lbl">
                CURRENTLY PLAYING:
              </p>

              <h2 className="current-track-title">
                {activeTrack.title}
              </h2>

              <p className="current-artist-name">
                by {activeTrack.artist}
              </p>

              <div className="player-controls">
                <div className="cta-button-group">
                  <button
                    className={`btn-stream-now ${isPlaying ? 'active-playing' : ''}`}
                    onClick={togglePlay}
                  >
                    {isPlaying ? 'PAUSE STREAM' : 'STREAM LIVE NOW'}
                  </button>

                  <button
                    className="btn-next-artist"
                    onClick={handleNextTrack}
                  >
                    NEXT ARTIST / SONG →
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>

        <div className="kpop-scrolling-panel">
          <div className="vertical-scroll-viewport">
            <div className="vertical-scroll-track">
              {scrollPlaylist.map((track, idx) => {
                const originalIndex = idx % kpopTracks.length;
                const isSelected = originalIndex === currentIndex;

                return (
                  <div
                    key={`${track.id}-${idx}`}
                    className={`vertical-song-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectTrack(originalIndex)}
                  >
                    <div
                      className="song-cover-box"
                      style={{
                        backgroundImage: `url(${track.coverImage})`
                      }}
                    >
                      <div
                        className={`vinyl-disc-mini ${
                          isPlaying && isSelected ? 'spinning' : ''
                        }`}
                      ></div>
                    </div>

                    <div className="song-details-meta">
                      <span className="track-badge">
                        {track.rank}
                      </span>

                      <h3 className="song-title">
                        {track.artist} - {track.title}
                      </h3>

                      <p className="song-album">
                        {track.album}
                      </p>

                      <div className="rating-stars">
                        ★★★★★
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default K_hero;
