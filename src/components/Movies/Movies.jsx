import { Outlet, Link } from "react-router-dom";
import MovieHeroSection from "./M_hero.jsx"

export default function Movies() {
  return (
    <>
    <MovieHeroSection/>
    <main className="movies-page">


      <nav className="movies-tabs">
  <Link to="/Movies">Articles</Link>
  <Link to="/Movies/gallery">Gallery</Link>
  <Link to="/Movies/videos">Videos</Link>
  <Link to="/Movies/audio">Audio</Link>
  <Link to="/Movies/characters">Characters</Link>
  <Link to="/Movies/events">Events</Link>
  <Link to="/Movies/merch">Merch</Link>
  <Link to="/Movies/trailers">Trailers</Link>
      </nav>

      <Outlet />

    </main>
    </>
  );
}

