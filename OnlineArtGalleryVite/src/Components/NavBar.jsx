import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = ({href}) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = -85;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY + offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };
  return (
    <nav>
      <Link to="/">
        <img src="Blogo.png" alt="Logo" className="logo" />
      </Link>
      <div className="menu btn2" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <Link to="/"  onClick={(e) => handleLinkClick("/")}>Home</Link>
        </li>
        <li>
          <Link to="#service"  onClick={(e) => handleLinkClick("/service")}>Features</Link>
        </li>
        <li>
          <Link to="#about"  onClick={(e) => handleLinkClick("/about")}>About</Link>
        </li>
        <li>
          <Link to="#contact"  onClick={(e) => handleLinkClick("/contact")}>Contact</Link>
        </li>
        <li>
          <Link to="/signin"  onClick={(e) => handleLinkClick("/signin")}>Sign In</Link>
        </li>
        <li>
          <Link to="/signup"  onClick={(e) => handleLinkClick("/signup")} className="signup">
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;