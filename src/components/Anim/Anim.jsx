import { Outlet ,Link} from "react-router-dom";
import Anim_hero from "./Anim_hero";
import "../../styles/AnimTabNav.css"
import { useRef } from "react";

export default function Anime() {

   const navRef = useRef(null);

  const handleMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  };

  const handleLeave = (e) => {
    e.currentTarget.style.transform = "translate(0, 0)";
  };

  return (
    <>
    <Anim_hero/>

    <main className="anime-page">
       {/* Tabs */}
      <nav ref={navRef} className="anime-tabs">
      <Link to="/Anime" onMouseMove={handleMove} onMouseLeave={handleLeave}>
        Articles
      </Link>

      <Link to="/Anime/gallery" onMouseMove={handleMove} onMouseLeave={handleLeave}>
        Gallery
      </Link>

      <Link to="/Anime/videos" onMouseMove={handleMove} onMouseLeave={handleLeave}>
        Videos
      </Link>

      <Link to="/Anime/audio" onMouseMove={handleMove} onMouseLeave={handleLeave}>
        Audio
      </Link>

      <Link to="/Anime/characters" onMouseMove={handleMove} onMouseLeave={handleLeave}>
        Characters
      </Link>

      <Link to="/Anime/events" onMouseMove={handleMove} onMouseLeave={handleLeave}>
        Events
      </Link>

      <Link to="/Anime/merch" onMouseMove={handleMove} onMouseLeave={handleLeave}>
        Merch
      </Link>

      <Link to="/Anime/trailers" onMouseMove={handleMove} onMouseLeave={handleLeave}>
        Trailers
      </Link>
    </nav>

      {/* YAHAN CONTENT CHANGE HOGA */}
      <Outlet />

    </main>
    </>
  );
}