import React, { useEffect, useState } from "react";
import "../styles/FandomHero.css";

const AUTOPLAY_TIME = 3000;

const slides = [
  {
    id: 1,
    category: "EXPLORE • ANIME",
    title: "Inside the World of Anime",
    description:
      "Explore legendary anime, unforgettable characters, powerful battles and stories that continue to shape the fandom.",
    button: "Explore Anime",
    number: "01",
    theme: "anime",
    accent: "ANIME",
    symbol: "ア",
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=2200&q=85"
  },
  {
    id: 2,
    category: "DISCOVER • GAMING",
    title: "Enter The Gaming Universe",
    description:
      "Discover games, legendary characters, immersive worlds, competitive moments and everything happening in gaming.",
    button: "Explore Gaming",
    number: "02",
    theme: "gaming",
    accent: "GAMING",
    symbol: "遊",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=2200&q=85"
  },
  {
    id: 3,
    category: "FEATURED • MOVIES",
    title: "Stories Beyond The Screen",
    description:
      "Explore cinematic worlds, unforgettable characters, iconic moments and stories that belong on the big screen.",
    button: "Explore Movies",
    number: "03",
    theme: "movies",
    accent: "MOVIES",
    symbol: "映",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=2200&q=85"
  },
  {
    id: 4,
    category: "POPULAR • TV SHOWS",
    title: "Your Next Series Awaits",
    description:
      "Discover unforgettable TV shows, characters, episodes and stories that keep fans coming back for more.",
    button: "Explore TV Shows",
    number: "04",
    theme: "tvshows",
    accent: "TV SHOWS",
    symbol: "視",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=2200&q=85"
  },
  {
    id: 5,
    category: "TRENDING • K-POP",
    title: "Feel The K-Pop Universe",
    description:
      "Discover artists, groups, performances, music and the latest moments from the world of K-Pop.",
    button: "Explore K-Pop",
    number: "05",
    theme: "kpop",
    accent: "K-POP",
    symbol: "音",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2200&q=85"
  },
  {
    id: 6,
    category: "EXPLORE • COMICS",
    title: "Stories Told In Panels",
    description:
      "Step into legendary comic universes filled with heroes, villains, unforgettable characters and epic stories.",
    button: "Explore Comics",
    number: "06",
    theme: "comics",
    accent: "COMICS",
    symbol: "漫",
    image:
      "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=2200&q=85"
  },
  {
    id: 7,
    category: "DISCOVER • MANGA",
    title: "Turn The Next Page",
    description:
      "Explore manga worlds, legendary characters, creators and stories that continue to inspire fans everywhere.",
    button: "Explore Manga",
    number: "07",
    theme: "manga",
    accent: "MANGA",
    symbol: "本",
    image:
      "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?auto=format&fit=crop&w=2200&q=85"
  }
];

function FandomHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState("next");
  const [progress, setProgress] = useState(0);

  const nextSlide = () => {
    setDirection("next");
    setActive((current) => (current + 1) % slides.length);
  };

  const previousSlide = () => {
    setDirection("prev");
    setActive((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  const goToSlide = (index) => {
    if (index === active) return;

    setDirection(index > active ? "next" : "prev");
    setActive(index);
  };

  useEffect(() => {
    if (paused) return;

    setProgress(0);

    const start = performance.now();
    let frame;

    const animate = (time) => {
      const elapsed = time - start;
      const percentage = Math.min(
        (elapsed / AUTOPLAY_TIME) * 100,
        100
      );

      setProgress(percentage);

      if (percentage < 100) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    const timer = setTimeout(() => {
      setDirection("next");
      setActive((current) => (current + 1) % slides.length);
    }, AUTOPLAY_TIME);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [active, paused]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        previousSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section
      className="fandom-hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-noise"></div>

      <div className="hero-orb orb-one"></div>
      <div className="hero-orb orb-two"></div>
      <div className="hero-orb orb-three"></div>

      <div className="hero-grid"></div>

      <div className="hero-slider">
        {slides.map((slide, index) => (
          <article
            key={slide.id}
            className={`hero-slide ${slide.theme} ${
              index === active ? `active ${direction}` : ""
            }`}
          >
            <div
              className="slide-background"
              style={{
                backgroundImage: `url(${slide.image})`
              }}
            ></div>

            <div className="slide-image-overlay"></div>

            <div className="slide-watermark">
              {slide.accent}
            </div>

            <div className="slide-symbol">
              {slide.symbol}
            </div>

            <div className="slide-content">
              <div className="slide-category">
                <span className="category-dot"></span>
                {slide.category}
              </div>

              <div className="slide-number">
                {slide.number}
              </div>

              <h1>{slide.title}</h1>

              <p>{slide.description}</p>

              <button className="hero-button">
                <span>{slide.button}</span>
                <span className="button-arrow">→</span>
              </button>
            </div>

            <div className="slide-visual">
              <div className="visual-ring ring-one"></div>
              <div className="visual-ring ring-two"></div>
              <div className="visual-ring ring-three"></div>

              <div className="visual-core">
                <span>{slide.symbol}</span>
              </div>

              <div className="floating-card card-top">
                <span className="mini-line"></span>
                FANDOMVERSE
              </div>

              <div className="floating-card card-bottom">
                <strong>{slide.number}</strong>
                <span>/ 07</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button
        className="slider-arrow arrow-left"
        onClick={previousSlide}
        aria-label="Previous slide"
      >
        <span>←</span>
      </button>

      <button
        className="slider-arrow arrow-right"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <span>→</span>
      </button>

      <div className="slider-bottom">
        <div className="slider-progress">
          <span
            className="progress-fill"
            style={{
              width: `${progress}%`
            }}
          ></span>
        </div>

        <div className="slider-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`slider-dot ${
                index === active ? "selected" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span></span>
            </button>
          ))}
        </div>

        <div className="slide-counter">
          <strong>
            {String(active + 1).padStart(2, "0")}
          </strong>
          <span>/</span>
          <span>07</span>
        </div>
      </div>

      <div className="scroll-indicator">
        <span></span>
        SCROLL TO EXPLORE
      </div>
    </section>
  );
}

export default FandomHero;