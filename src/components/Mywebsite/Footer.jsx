import { useState, useEffect } from 'react';
import "../../styles/Footer.css"
import Goko from "../../assets/Footer/Goku.png"
const AnimeFooter = () => {
  const [subbedJP, setSubbedJP] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const animeCharacters = [
    {
      id: 'luffy',
      name: 'Monkey D. Luffy',
    //   img: Goko,
      fallback: 'https://lh3.googleusercontent.com/d/1SDpV4N3ePJL0AiLu06UX59JEwWqxt2_l'
    },
    {
      id: 'naruto',
      name: 'Naruto Uzumaki',
      img: 'https://png.pngtree.com/png-clipart/20230511/original/pngtree-naruto-uzumaki-anime-character-vector-png-image_9156681.png',
      fallback: 'https://placehold.co/280x320/1f2937/ffffff?text=Naruto'
    },
    {
      id: 'goku',
      name: 'Son Goku',
      img: Goko,
      fallback: 'https://placehold.co/280x320/1f2937/ffffff?text=Goku'
    }
  ];

  // Character rotation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % animeCharacters.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [animeCharacters.length]);

  return (
   <footer className="anime-footer">

  <div className="footer-topbar">
    <div className="footer-toggle-area">
      <label className="footer-toggle-label">
        <input
          type="checkbox"
          checked={subbedJP}
          onChange={() => setSubbedJP(!subbedJP)}
        />
        <span className="footer-toggle"></span>
      </label>

      <span className="footer-toggle-text">
        EN / JP Subbed
      </span>
    </div>

    <div className="footer-server">
      <span className="server-dot"></span>
      <span>Servers Operational</span>
    </div>
  </div>

  <div className="footer-main">

    <div className="footer-brand">
      <div className="footer-logo">
        <span className="footer-logo-text">
          9ix<span>Anime</span>
        </span>
      </div>

      <p className="footer-description">
        Copyright &copy; 2026{" "}
        <strong>9ixAnime</strong>. All Rights Reserved.
        <br />
        Your ultimate hub for streaming & entertainment content.
      </p>

      <div className="footer-socials">
        {/* tumhare existing SVG links yahan */}
      </div>

      <p className="footer-disclaimer">
        Disclaimer: This site does not store any files on its server.
        All contents are provided by non-affiliated third parties.
      </p>
    </div>

    <div className="footer-navigation">

      <div className="footer-column">
        <h4 className="footer-heading">Explore</h4>

        <ul className="footer-links">
          <li>
            <a href="#">
              <svg className="movie-icon" viewBox="0 0 24 24">
                {/* existing path */}
              </svg>
              Movies
            </a>
          </li>

          <li>
            <a href="#">
              <svg className="game-icon" viewBox="0 0 24 24">
                {/* existing path */}
              </svg>
              Games
            </a>
          </li>

          <li>
            <a href="#">
              <svg className="kpop-icon" viewBox="0 0 24 24">
                {/* existing path */}
              </svg>
              K-Pop
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-column">
        <h4 className="footer-heading help">Help</h4>

        <ul className="footer-links">
          <li><a href="#">Contact</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">9ixAnime App</a></li>
        </ul>
      </div>

    </div>

    <div className="footer-characters">

      <div className="footer-glow"></div>

      <div className="footer-character-wrapper">
        {animeCharacters.map((char, index) => {
          const isActive = index === currentIndex;

          return (
            <img
              key={char.id}
              src={char.img}
              alt={char.name}
              onError={(e) => {
                e.currentTarget.src = char.fallback;
              }}
              className={`footer-character ${
                isActive ? "active" : ""
              }`}
            />
          );
        })}
      </div>

      <div className="footer-character-name">
        <span className="character-status"></span>
        <span>{animeCharacters[currentIndex].name}</span>
      </div>

    </div>

  </div>
</footer>
  );
};

export default AnimeFooter;