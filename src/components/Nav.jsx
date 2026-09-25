import { useEffect, useState } from "react";
import Shutter from "./Shutter";
import "../styles/Nav.css";
import logo from "../assets/Nav/Nav_logo.png"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bookmark, UserRound } from "lucide-react";
import { useBookmarks } from "../fandom/store";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const bookmarks = useBookmarks();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (event) => {
    event.preventDefault();
    if (searchOpen && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
      return;
    }
    setSearchOpen(true);
  };

  return (
    <>
      <header className={`nav_parent ${scrolled ? "is-scrolled" : ""}`}>
        <nav className="nav" aria-label="Main">
         <Link to="/" className="nav_logo" aria-label="FandomVerse home">
            <img src={logo} alt="FandomVerse" />
          </Link>

          <div className="nav_right">
            <form className={`nav_search ${searchOpen ? "search_open" : ""}`} onSubmit={submitSearch} role="search">
              {searchOpen ? (
                <input
                  autoFocus
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onBlur={() => !query && setSearchOpen(false)}
                  placeholder="Search every fandom"
                  aria-label="Search every fandom"
                />
              ) : <span aria-hidden="true">Search</span>}
              <button type="submit" aria-label={searchOpen ? "Submit search" : "Open search"}>⌕</button>
            </form>

            <NavLink to="/bookmarks" className="nav_pill nav_bookmarks" aria-label={`Bookmarks (${bookmarks.length})`}>
              <Bookmark size={16} />
              {bookmarks.length > 0 && <span>{bookmarks.length}</span>}
            </NavLink>

            <NavLink to="/account" className="nav_pill nav_login">
              <UserRound size={16} />
              <span>Log in</span>
            </NavLink>

            <button className="nav_menu" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>
              <span>Menu</span>
              <span className="menu_icon" aria-hidden="true">
                <i></i>
                <i></i>
              </span>
            </button>
          </div>
        </nav>
      </header>

      <Shutter open={open} setOpen={setOpen} />
    </>
  );
};

export default Nav;
