import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import events from "../../JSON/upcomingEvents.json";
import "../../styles/UpcomingEvents.css";

gsap.registerPlugin(ScrollTrigger);

const UpcomingEvents = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".upcoming-heading",
        {
          opacity: 0,
          y: 25
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(
        ".view-all-btn",
        {
          opacity: 0,
          x: 25
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: index % 2 === 0 ? -70 : 70,
            y: 35
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.9,
            delay: index * 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 4;
    const rotateX = ((y / rect.height) - 0.5) * -4;

    gsap.to(card, {
      rotateX,
      rotateY,
      y: -6,
      scale: 1.02,
      duration: 0.35,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (card) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out"
    });
  };

  return (
    <section className="upcoming-events" ref={sectionRef}>
      <div className="upcoming-header">
        <h2 className="upcoming-heading">
          Upcoming Events
        </h2>

        <button className="view-all-btn">
          View All
        </button>
      </div>

      <div className="upcoming-cards">
        {events.slice(0, 3).map((event, index) => (
          <div
            className="event-card"
            key={event.id}
            ref={(el) => (cardsRef.current[index] = el)}
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          >
            <div className="event-image">
              <img src={event.image} alt={event.title} />
              <span className="event-category">
                {event.category}
              </span>
            </div>

            <div className="event-info">
              <div className="event-date">
                <span>{event.date}</span>
                <small>{event.month}</small>
              </div>

              <div className="event-details">
                <h3>{event.title}</h3>

                <div className="event-location">
                  <span>●</span>
                  {event.location}
                </div>

                <p>{event.description}</p>
              </div>
            </div>

            <div className="event-footer">
              <span>{event.eventDate}</span>

              <button className="event-arrow">
                →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;