import { Outlet ,Link} from "react-router-dom";

export default function Anime() {
  return (
    <main className="anime-page">

      {/* Anime Hub Header */}
      <section className="anime-header">
        <h1>Anime Hub</h1>
        <p>17 items · updated regularly</p>
      </section>

      {/* Tabs */}
      <nav className="anime-tabs">
        <Link to="/Anime">Articles</Link>
        <Link to="/Anime/gallery">Gallery</Link>
        <Link to="/Anime/videos">Videos</Link>
        <Link to="/Anime/audio">Audio</Link>
        <Link to="/Anime/characters">Characters</Link>
        <Link to="/Anime/events">Events</Link>
        <Link to="/Anime/merch">Merch</Link>
        <Link to="/Anime/trailers">Trailers</Link>
      </nav>

      {/* YAHAN CONTENT CHANGE HOGA */}
      <Outlet />

    </main>
  );
}