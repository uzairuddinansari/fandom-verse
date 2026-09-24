import { Outlet, Link } from "react-router-dom";

export default function Gaming() {
  return (
    <main className="gaming-page">

      <section className="gaming-header">
        <h1>Gaming Hub</h1>
        <p>17 items · updated regularly</p>
      </section>

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
  );
}