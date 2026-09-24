import { Outlet, Link } from "react-router-dom";

export default function Movies() {
  return (
    <main className="movies-page">

      <section className="movies-header">
        <h1>Videos Hub</h1>
        <p>17 items · updated regularly</p>
      </section>

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
  );
}

