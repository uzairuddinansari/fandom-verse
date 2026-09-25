import { Outlet, Link } from "react-router-dom";

export default function Manga() {
  return (
    <main className="manga-page">

      <section className="manga-header">
        <h1>Manga Hub</h1>
        <p>8 items · updated regularly</p>
      </section>

      <nav className="manga-tabs">
        <Link to="/Manga">Articles</Link>
        <Link to="/Manga/gallery">Gallery</Link>
        <Link to="/Manga/videos">Videos</Link>
        <Link to="/Manga/audio">Audio</Link>
        <Link to="/Manga/characters">Characters</Link>
        <Link to="/Manga/events">Events</Link>
        <Link to="/Manga/merch">Merch</Link>
        <Link to="/Manga/trailers">Trailers</Link>
      </nav>

      <Outlet />

    </main>
  );
}