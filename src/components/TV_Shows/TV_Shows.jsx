import { Outlet, Link } from "react-router-dom";
import TvShowsHeroSection from "./TV_hero";

export default function TV_Shows() {
  return (
    <>
    <TvShowsHeroSection/>
    <main className="tv-shows-page">

      <nav className="tv-shows-tabs">
        <Link to="/TV_Shows">Articles</Link>
        <Link to="/TV_Shows/gallery">Gallery</Link>
        <Link to="/TV_Shows/videos">Videos</Link>
        <Link to="/TV_Shows/audio">Audio</Link>
        <Link to="/TV_Shows/characters">Characters</Link>
        <Link to="/TV_Shows/events">Events</Link>
        <Link to="/TV_Shows/merch">Merch</Link>
        <Link to="/TV_Shows/trailers">Trailers</Link>
      </nav>

      <Outlet />

    </main>
    </>
  );
}
