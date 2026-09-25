import { Outlet, Link } from "react-router-dom";
import "./Gaming_hero.jsx"
import HeroSection from "../Gaming/Gaming_hero.jsx"

export default function Gaming() {
  return (
    <> 
    <HeroSection />

    <main className="gaming-page">
      <nav className="gaming-tabs">
        <Link to="/Gaming">Articles</Link>
        <Link to="/Gaming/gallery">Gallery</Link>
        <Link to="/Gaming/videos">Videos</Link>
        <Link to="/Gaming/audio">Audio</Link>
        <Link to="/Gaming/characters">Characters</Link>
        <Link to="/Gaming/events">Events</Link>
        <Link to="/Gaming/merch">Merch</Link>
        <Link to="/Gaming/trailers">Trailers</Link>
      </nav>

      <Outlet />

    </main>
    </>
  );
}