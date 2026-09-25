import React, { useState, useEffect } from 'react';
import '../../styles/MovieHeroSection.css';

const moviesList = [
  {
    id: 1,
    title: "THE CELESTIAL VOYAGE",
    subtitle: "THE",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    description: "Dive into an exclusive collection of blockbusters, award-winning documentaries, and timeless classics. From edge-of-your-seat thrillers to heartwarming tales, your next great story awaits. Stream in 4K HDR today."
  },
  {
    id: 2,
    title: "NEBULA HORIZON",
    subtitle: "BEYOND",
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
    description: "Experience the ultimate space odyssey as humanity pushes past the boundary of known space into infinite darkness and discovery."
  },
  {
    id: 3,
    title: "CHRONOS REBORN",
    subtitle: "THE LEGEND OF",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
    description: "Time bends to no one, until now. A mind-bending thriller exploring parallel realities and lost dimensions."
  }
];

const MovieHeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % moviesList.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const currentMovie = moviesList[currentIndex];

  return (
    <div className="movie-page-wrapper">
      <video className="bg-video-stream" autoPlay loop muted playsInline>
        <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1610-large.mp4" type="video/mp4" />
      </video>

      <div className="video-overlay-tint"></div>

      <nav className="movie-navbar">
        <div className="nav-left">
          <div className="logo">
            <svg className="logo-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span className="logo-text">Logo</span>
          </div>
        </div>
        
        <div className="nav-center">
          <a href="#home" className="nav-link active">Home</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#community" className="nav-link">Community</a>
        </div>

        <div className="nav-right">
          <button className="btn-text">Log in</button>
          <button className="btn-nav-primary">Sign up</button>
        </div>
      </nav>

      <section className="movie-hero-container">
        <div className="bg-reel reel-top-left"></div>
        <div className="bg-reel reel-bottom-right"></div>
        <div className="bg-camera camera-right"></div>

        <div className="hero-main-frame">
          <div 
            className="poster-container"
            style={{ backgroundImage: `url(${currentMovie.image})` }}
          >
            <div className="poster-gradient-mask"></div>
            <div className="poster-overlay-top">
              <span className="poster-subtext">{currentMovie.subtitle}</span>
              <h2 className="poster-title">{currentMovie.title}</h2>
            </div>
          </div>

          <div className="hero-floating-card">
            <span className="card-top-tag">{currentMovie.title}</span>
            
            <h1 className="hero-heading">
              EXPLORE BOUNDLESS<br />WORLDS OF CINEMA.
            </h1>

            <p className="hero-description">
              {currentMovie.description}
            </p>

            <div className="card-cta-group">
              <button className="btn-cta-primary">START YOUR FREE TRIAL</button>
              <button className="btn-cta-secondary">EXPLORE CATEGORIES</button>
            </div>

            <div className="card-stats-row">
              <div className="stat-box">
                <span className="stat-val">360</span>
                <span className="stat-lbl">followers</span>
              </div>
              <div className="stat-box">
                <span className="stat-val">13K</span>
                <span className="stat-lbl">followers</span>
              </div>
              <div className="stat-box">
                <span className="stat-val">133</span>
                <span className="stat-lbl">Streamers</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieHeroSection;