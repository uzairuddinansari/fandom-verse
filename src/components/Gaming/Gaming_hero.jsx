import '../../styles/Gaming_hero.css';

const HeroSection = () => {
  return (
    <section className="hero-container">
      <div className="hero-glow glow-top-left"></div>
      <div className="hero-glow glow-bottom-right"></div>

      <div className="hero-content">
        <div className="hero-text-area">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span className="badge-text">Next-Gen Gaming Experience</span>
          </div>

          <h1 className="hero-title">
            Dominate The Arena <br />
            <span>Unleash True Power</span>
          </h1>

          <p className="hero-subtitle">
            Step into the ultimate gaming universe. Stream high-octane esports matches, 
            compete in global tournaments, and connect with millions of gamers worldwide.
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary">
              Join Tournament Now
              <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button className="btn-secondary">
              Watch Stream
              <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">250K+</span>
              <span className="stat-label">Active Players</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">$1M+</span>
              <span className="stat-label">Prize Pools</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">60FPS</span>
              <span className="stat-label">Ultra HD Streams</span>
            </div>
          </div>
        </div>

        <div className="hero-visual-area">
          <div className="hero-card">
            <div className="card-header">
              <div className="card-tag">LIVE PRO MATCH</div>
              <div className="card-status">● 45.2K Viewers</div>
            </div>

            <div className="card-media-placeholder">
              <div className="play-overlay">
                <div className="play-button-pulse">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="card-details">
              <h3 className="card-title">Cyber Showdown 2026 Finals</h3>
              <p className="card-desc">Team Alpha vs Cyber Knights — Grand Arena Championship</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;