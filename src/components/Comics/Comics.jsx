import { Outlet, Link } from "react-router-dom";
import Comecs_Hero from "./C_Hero";

export default function Comics() {
  return (
    <>
    <Comecs_Hero/>
    <main className="comics-page">
      <nav className="comics-tabs">
        <Link to="/Comics">Articles</Link>
        <Link to="/Comics/gallery">Gallery</Link>
        <Link to="/Comics/videos">Videos</Link>
        <Link to="/Comics/audio">Audio</Link>
        <Link to="/Comics/characters">Characters</Link>
        <Link to="/Comics/events">Events</Link>
        <Link to="/Comics/merch">Merch</Link>
        <Link to="/Comics/trailers">Trailers</Link>
      </nav>

      <Outlet />

    </main>
    </>
  );
}