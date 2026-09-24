import { useState } from "react";
import Shutter from "./Shutter";
import "../styles/Nav.css";
import logo from "../assets/Nav/Nav_logo.png"
import { Link } from "react-router-dom";

const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="nav_parent">
        <nav className="nav">
         <Link to="/" className="nav_logo">
            <img src={logo} />
          </Link>

          <div className="nav_right">
            <div className="nav_search">
              <span>Search</span>
              <button aria-label="Search">⌕</button>
            </div>

            <button className="nav_menu" onClick={() => setOpen(true)}>
              <span>Menu</span>
              <span className="menu_icon">
                <i></i>
                <i></i>
              </span>
            </button>
          </div>
        </nav>
      </div>

      <Shutter open={open} setOpen={setOpen} />
    </>
  );
};

export default Nav;
