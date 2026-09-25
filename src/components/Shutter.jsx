import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../styles/Shutter.css";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "Elm Grove Residence",
    description: "Full interior renovation of a heritage bungalow in Melbourne. Recycled brick, limestone, and white oak joinery for a young family.",
    location: "MELBOURNE, AUSTRALIA",
    size: "2,800 SQ FT",
    time: "18 WEEKS",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90"
  },
  {
    title: "Oak House",
    description: "A warm contemporary residence built around natural materials, soft light, and timeless furniture.",
    location: "BROOKLYN, NEW YORK",
    size: "3,200 SQ FT",
    time: "22 WEEKS",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=90"
  },
  {
    title: "Clay Residence",
    description: "A refined residential interior balancing raw textures with quiet, modern architectural details.",
    location: "LOS ANGELES, USA",
    size: "2,450 SQ FT",
    time: "16 WEEKS",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90"
  }
];

const RollingLink = ({ to, children }) => {
  const text = String(children);

  return (
    <Link to={to} className="rolling_link">
      <span className="rolling_mask">
        <span className="rolling_line rolling_current">
          {text.split("").map((char, i) => (
            <span key={i}>{char === " " ? "\u00A0" : char}</span>
          ))}
        </span>

        <span className="rolling_line rolling_next" aria-hidden="true">
          {text.split("").map((char, i) => (
            <span key={i}>{char === " " ? "\u00A0" : char}</span>
          ))}
        </span>
      </span>
    </Link>
  );
};

const Shutter = ({ open, setOpen }) => {
  const shutterRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const metaRef = useRef(null);
  const imageRef = useRef(null);
  const nextImageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const titleClipRef = useRef(null);
  const tl = useRef(null);

  const [active, setActive] = useState(0);

  const project = projects[active];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(shutterRef.current, {
        visibility: "hidden",
        pointerEvents: "none"
      });

      gsap.set(leftRef.current, {
        xPercent: -100,
        opacity: 0,
      });

      gsap.set(rightRef.current, {
        xPercent: 100,
        opacity: 0,
      });

      gsap.set(leftContentRef.current, {
        opacity: 0,
        x: -35
      });

      gsap.set(rightContentRef.current, {
        opacity: 0,
        x: 35
      });

      gsap.set(metaRef.current, {
        opacity: 0,
        y: -30
      });

      gsap.set(titleRef.current, {
        opacity: 0,
        y: 40
      });

      tl.current = gsap.timeline({ paused: true });

      tl.current
        .set(shutterRef.current, {
          visibility: "visible",
          pointerEvents: "auto"
        })
        .to(leftRef.current, {
          xPercent: 0,
          duration: 1.15,
          ease: "power4.inOut"
        }, 0)
        .to(rightRef.current, {
          xPercent: 0,
          duration: 1.15,
          ease: "power4.inOut"
        }, 0)
        .to(leftRef.current, {
          opacity: 1,
          duration: 0.45,
          ease: "power2.out"
        }, 0.72)
        .to(rightRef.current, {
          opacity: 1,
          duration: 0.45,
          ease: "power2.out"
        }, 0.72)
        .to(leftContentRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out"
        }, 0.78)
        .to(rightContentRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out"
        }, 0.78)
        .to(metaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out"
        }, 0.85)
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, 0.8);
    }, shutterRef);

    return () => {
      ctx.revert();
      tl.current?.kill();
    };
  }, []);

  useLayoutEffect(() => {
    if (!tl.current) return;

    if (open) {
      tl.current.play();
    } else {
      tl.current.reverse();

      tl.current.eventCallback("onReverseComplete", () => {
        gsap.set(shutterRef.current, {
          visibility: "hidden",
          pointerEvents: "none"
        });
      });
    }
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      const next = (active + 1) % projects.length;

      gsap.set(nextImageRef.current, {
        src: projects[next].image,
        opacity: 0,
        scale: 1.03
      });

      gsap.timeline()
        .to(imageRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut"
        }, 0)
        .to(nextImageRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.inOut"
        }, 0)
        .call(() => {
          setActive(next);
          gsap.set(imageRef.current, { opacity: 1 });
          gsap.set(nextImageRef.current, { opacity: 0 });
        });
    }, 5000);

    return () => clearInterval(interval);
  }, [open, active]);

  const handleMouseEnter = () => {
    gsap.to(imageRef.current, {
      scale: 1.08,
      duration: 1,
      ease: "power3.out"
    });

    gsap.to(metaRef.current, {
      y: -55,
      duration: 0.7,
      ease: "power3.out"
    });

    gsap.to(titleRef.current, {
      y: "-30%",
      duration: 0.65,
      ease: "power3.inOut"
    });

    gsap.to(descriptionRef.current, {
      y: "0%",
      duration: 0.7,
      ease: "power3.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 1,
      ease: "power3.out"
    });

    gsap.to(metaRef.current, {
      y: 0,
      duration: 0.7,
      ease: "power3.out"
    });

    gsap.to(titleRef.current, {
      y: "0%",
      duration: 0.65,
      ease: "power3.inOut"
    });

    gsap.set(descriptionRef.current, {
      y: "200%"
    });

    gsap.to(descriptionRef.current, {
      y: "200%",
      duration: 0.6,
      ease: "power3.inOut"
    });
  };

  return (
    <div ref={shutterRef} className="shutter">
      <div ref={leftRef} className="shutter_left">
        <div className="shutter_top">
          <div>
            <div className="brand">
              <span className="brand_mark">///</span>
              <span>AVÉON</span>
            </div>

            <div className="brand_subtitle">
              INTERIOR DESIGN STUDIO — EST. 2020
            </div>
          </div>

          <button className="shutter_close" onClick={() => setOpen(false)}>
            ×
          </button>
        </div>

        <div ref={leftContentRef} className="left_content">
          <nav className="shutter_links">
            <RollingLink to="/">Home</RollingLink>
            <RollingLink to="/Trailers">Trailers</RollingLink>
            <RollingLink to="/services">Services</RollingLink>
            <RollingLink to="/work">Work</RollingLink>
            <RollingLink to="/journal">Journal</RollingLink>
            <RollingLink to="/contact">Contact</RollingLink>
            <RollingLink to="/legal">Legal</RollingLink>
          </nav>
        </div>

        <div className="shutter_footer">
          <div>
            <span>[ CONTACT INFO ]</span>
            <p>hello@aveondesign.com</p>
            <p>+1 (415) 555-0199</p>
          </div>

          <div className="visit">
            <span>[ VISIT US ]</span>
            <p>Visit in San Francisco</p>
            <p>Visit in Brooklyn</p>
          </div>

          <small>© 2026 AVÉON DESIGN</small>
        </div>
      </div>

      <div ref={rightRef} className="shutter_right">
        <div ref={rightContentRef} className="right_content">

          <div className="project_meta_clip">
            <div className="project_meta">
              <div ref={metaRef} className="project_meta_inner">
                <span>{project.location}</span>
                <b>/</b>
                <span>{project.size}</span>
                <b>/</b>
                <span>{project.time}</span>
              </div>
            </div>
          </div>

          <div
            className="project_image"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img ref={imageRef} src={project.image} alt={project.title} />
            <img ref={nextImageRef} src="" alt="" />

            <div className="image_overlay" />
          </div>

          <div className="project_title">
            <div className="project_text">
              <h1 ref={titleRef}>{project.title}</h1>

              <div ref={titleClipRef} className="project_title_clip">
                <p ref={descriptionRef}>{project.description}</p>
              </div>
            </div>

            <span>VIEW PROJECT ↗</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Shutter;
