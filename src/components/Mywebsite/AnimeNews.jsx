import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../styles/AnimeNews.css"
import FooterData from "../../JSON/AnimeNews.json";
import { resolveMedia } from "../../fandom/catalog";

gsap.registerPlugin(ScrollTrigger);

const AnimeNews = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 25%",
          scrub: 1.2,
        },
      });

      tl.from(".anime-heading", {
        x: -70,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      })

      .from(
        ".anime-view-all",
        {
          x: 70,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "<"
      )

      .from(
        ".anime-card",
        {
          y: 100,
          opacity: 0,
          scale: 0.9,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.2"
      );


      // ==============================
      // PROFESSIONAL 3D HOVER
      // ==============================

      cardsRef.current.forEach((card) => {

        if (!card) return;

        const image = card.querySelector(".anime-image");

        const mouseMove = (e) => {

          const rect = card.getBoundingClientRect();

          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          let rotateX =
            ((y - centerY) / centerY) * -4;

          let rotateY =
            ((x - centerX) / centerX) * 4;

          rotateX = Math.max(-4, Math.min(4, rotateX));
          rotateY = Math.max(-4, Math.min(4, rotateY));

          card.style.setProperty(
            "--mouse-x",
            `${(x / rect.width) * 100}%`
          );

          card.style.setProperty(
            "--mouse-y",
            `${(y / rect.height) * 100}%`
          );

          gsap.to(card, {
            rotateX,
            rotateY,
            y: -6,
            scale: 1.015,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });

          gsap.to(image, {
            scale: 1.07,
            duration: 0.5,
            ease: "power2.out",
          });
        };


        const mouseLeave = () => {

          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            scale: 1,
            duration: 0.55,
            ease: "power3.out",
          });

          gsap.to(image, {
            scale: 1,
            duration: 0.55,
            ease: "power3.out",
          });
        };


        card.addEventListener("mousemove", mouseMove);
        card.addEventListener("mouseleave", mouseLeave);

        card._mouseMove = mouseMove;
        card._mouseLeave = mouseLeave;

      });

    }, sectionRef);


    return () => {

      cardsRef.current.forEach((card) => {

        if (!card) return;

        card.removeEventListener(
          "mousemove",
          card._mouseMove
        );

        card.removeEventListener(
          "mouseleave",
          card._mouseLeave
        );

      });

      ctx.revert();

    };

  }, []);


  return (

    <section
      ref={sectionRef}
      className="anime-news"
    >

      <div className="anime-container">

        {/* HEADER */}

        <div className="anime-header">

          <div className="anime-heading">

            <div className="heading-line"></div>

            <div>

              <h2>
                Anime Pulse
              </h2>

              <p>
                The latest anime stories, releases & community
              </p>

            </div>

          </div>


          <Link to="/search?type=article" className="anime-view-all">
            View All
            <span>→</span>
          </Link>

        </div>


        {/* CARDS */}

        <div className="anime-cards">

          {FooterData.map((card, index) => (

            <article
              key={card.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="anime-card"
              style={{
                "--accent": card.accent,
              }}
            >

              <div className="anime-card-inner">

                {/* GLOW */}

                <div className="card-glow"></div>


                {/* IMAGE */}

                <div className="image-wrapper">

                  <img
                    src={resolveMedia(card.image)}
                    loading="lazy"
                    alt={card.title}
                    className="anime-image"
                  />

                  <div className="image-overlay"></div>

                  <span className="category">
                    {card.category}
                  </span>

                </div>


                {/* CONTENT */}

                <div className="card-content">

                  <h3>
                    {card.title}
                  </h3>

                  <p>
                    {card.description}
                  </p>


                  {/* TAGS */}

                  <div className="tags">

                    {card.tags.map((tag) => (

                      <span key={tag}>
                        {tag}
                      </span>

                    ))}

                  </div>


                  {/* FOOTER */}

                  <div className="card-footer">

                    <span>
                      {card.date}
                    </span>

                    <span>
                      {card.readTime}
                    </span>

                    <Link to={card.link} aria-label={`Read more about ${card.title}`}>
                      →
                    </Link>

                  </div>

                </div>

              </div>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
};

export default AnimeNews;