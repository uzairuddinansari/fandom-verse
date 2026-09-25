import { Outlet, Link } from "react-router-dom";
import K_Pop_hero from "./K_hero"

export default function K_Pop() {
  return (
    <>
    <K_Pop_hero/>
    <main className="k-pop-page">
      <nav className="k-pop-tabs">
        <Link to="/K_Pop">Articles</Link>
        <Link to="/K_Pop/gallery">Gallery</Link>
        <Link to="/K_Pop/videos">Videos</Link>
        <Link to="/K_Pop/audio">Audio</Link>
        <Link to="/K_Pop/characters">Characters</Link>
        <Link to="/K_Pop/events">Events</Link>
        <Link to="/K_Pop/merch">Merch</Link>
        <Link to="/K_Pop/trailers">Trailers</Link>
      </nav>

      <Outlet />

    </main>
    </>
  );
}
