
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import "../styles/PageTransition.css";

function PageTransition({ children }) {
  const location = useLocation();
  const shutterRef = useRef(null);
  const firstRender = useRef(true);
  const previousSection = useRef("");

  const getSection = (pathname) => {
    const parts = pathname.split("/").filter(Boolean);

    if (parts[0] === "admin" && parts[1] === "dashboard") {
      return "admin-dashboard";
    }

    return parts[0] || "home";
  };

  useEffect(() => {
    const currentSection = getSection(location.pathname);

    if (firstRender.current) {
      firstRender.current = false;
      previousSection.current = currentSection;
      return;
    }

    if (previousSection.current === currentSection) {
      return;
    }

    previousSection.current = currentSection;

    const shutter = shutterRef.current;

    gsap.killTweensOf(shutter);

    const tl = gsap.timeline();

    tl.set(shutter, { left: "-100%" })
      .to(shutter, {
        left: "0%",
        duration: 0.8,
        ease: "power2.inOut"
      })
      .to({}, { duration: 0.08 })
      .to(shutter, {
        left: "-110%",
        duration: 0.8,
        ease: "power2.inOut"
      });

    return () => tl.kill();
  }, [location.pathname]);

  return (
    <>
      <div ref={shutterRef} className="page-shutter" />
      {children}
    </>
  );
}

export default PageTransition;
