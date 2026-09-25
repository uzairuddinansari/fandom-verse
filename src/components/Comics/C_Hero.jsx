import "../../styles/MarvelHero.css";
import bg from "../../assets/Comics_hero/Comics_Hero.jpeg"
import bg1 from "../../assets/Comics_hero/Comics_Hero1.jpeg"
import bg3 from "../../assets/Comics_hero/Comics_Hero3.jpeg"
import bg4 from "../../assets/Comics_hero/Comics_Hero4.jpeg"
import bg2 from "../../assets/Comics_hero/Comics_Hero2.jpeg"
import bg_main from "../../assets/Comics_hero/Comics_main.gif"

const comicCards = [
  {
    title: "SPIDER-MAN",
    category: "WEB SLINGER",
    image: bg1,
  },
  {
    title: "AVENGERS",
    category: "EARTH'S HEROES",
    image: bg2,
  },
  {
    title: "IRON MAN",
    category: "MARVEL HERO",
    image: bg3,
  },
  {
    title: "CAPTAIN AMERICA",
    category: "SUPER SOLDIER",
    image: bg4,
  },
];

export default function Comecs_Hero() {
  return (
    <section className="marvel-hero">

      {/* Background Artwork */}
      <div className="marvel-background">
        <img
          src={bg}
          className="background-image"
        />

        <div className="background-overlay"></div>
      </div>

      {/* Decorative comic lines */}
      <div className="hero-lines hero-lines-left"></div>
      <div className="hero-lines hero-lines-right"></div>

      {/* Main Hero Content */}
      <div className="marvel-hero-content">

        {/* Comic Cards */}
        <div className="comic-cards">

          {comicCards.map((comic, index) => (
            <article
              className={`comic-card comic-card-${index + 1}`}
              key={comic.title}
            >

              <div className="comic-card-image">
                <img
                  src={comic.image}
                  alt={comic.title}
                />

                <div className="comic-card-overlay"></div>

                <span className="comic-number">
                  0{index + 1}
                </span>
              </div>

              <div className="comic-card-content">
                <span className="comic-category">
                  {comic.category}
                </span>

                <h3>{comic.title}</h3>

                <span className="comic-arrow">
                  →
                </span>
              </div>

            </article>
          ))}

        </div>

        {/* Central Hero */}
        <div className="hero-character">

          <div className="character-glow"></div>

          <img
            src={bg_main}
            alt="Marvel superhero"
            className="hero-gif"
          />

        </div>

        {/* Bottom text */}
        <div className="hero-bottom">

          <div className="hero-bottom-line"></div>

          <p>
            ENTER THE WORLD OF
            <strong> HEROES</strong>
          </p>

          <div className="hero-bottom-line"></div>

        </div>

      </div>

    </section>
  );
}