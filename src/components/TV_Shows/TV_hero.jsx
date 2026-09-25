import '../../styles/TvShowsHeroSection.css';
import TV1 from "../../assets/TV_shows_hero/tv_show1.jpeg"

const tvShowsData = [
  {
    id: 1,
    title: "STARSHIP ODYSSEY",
    season: "S2",
    episode: "EP 6",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "QUANTUM CHRONICLES",
    season: "S1",
    episode: "EP 4",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "GALACTIC FRONTIERS",
    season: "S3",
    episode: "EP 12",
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "NEBULA BOUND",
    season: "S2",
    episode: "EP 8",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    title: "CYBER HORIZON",
    season: "S4",
    episode: "EP 2",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80"
  }
];

const TvShowsHeroSection = () => {
  const carouselShows = [...tvShowsData, ...tvShowsData];

  return (
    <div className="tv-wrapper">
      <nav className="tv-navbar">
        <div className="tv-brand">
          <span className="tv-brand-name">LOGO</span>
        </div>

        <ul className="tv-nav-menu">
          <li className="tv-nav-item active">Home</li>
          <li className="tv-nav-item">TV Shows</li>
          <li className="tv-nav-item">New Releases</li>
          <li className="tv-nav-item">Community</li>
        </ul>

        <div className="tv-nav-actions">
          <button className="tv-btn-login">Log in</button>
          <button className="tv-btn-cta">Sign up</button>
        </div>
      </nav>

      <section className="tv-hero-container">
        <div className="tv-hero-frame">
          <div className="tv-video-container">
            <video className="hero-video" autoPlay loop muted playsInline>
              <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1610-large.mp4" type="video/mp4" />
            </video>
            <div className="video-tint"></div>
          </div>
        </div>

        <div className="tv-carousel-section">
          <div className="tv-carousel-track">
            {carouselShows.map((show, index) => (
              <div key={`${show.id}-${index}`} className="tv-show-card">
                <div className="card-image-box" style={{ backgroundImage: `url(${show.image})` }}>
                  <span className="badge-ep">{show.episode}</span>
                  <span className="badge-season">{show.season}</span>
                </div>
                <div className="card-info">
                  <h4 className="card-show-title">{show.title}</h4>
                  <span className="card-show-sub">{show.season}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TvShowsHeroSection;