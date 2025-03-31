import React, { useEffect, useState } from "react";
import { Search, Menu, Person, AddBox, Close } from "@mui/icons-material";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const [showNav, setShowNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const [logoSize, setLogoSize] = useState({ width: "220px", height: "70px" });

  useEffect(() => {
    const updateLogoSize = () => {
      if (window.innerWidth < 768) {
        setLogoSize({ width: "150px", height: "50px" });
      } else {
        setLogoSize({ width: "220px", height: "70px" });
      }
    };

    updateLogoSize(); // Call on mount
    window.addEventListener("resize", updateLogoSize);

    return () => window.removeEventListener("resize", updateLogoSize);
  }, []);

  const navigateToLogin = () => {
    navigate("/signin");
  };

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          {/* <a href="/">WheelzLoop</a> */}
          <img src="/images/logo.png" className="brand-name" style={logoSize} />
        </div>

        <div className={`search ${showSearch ? "mobile-search" : ""}`}>
          <input type="text" placeholder="Search for cars, mobiles, etc." />
          <button aria-label="search-button">
            <Search />
          </button>
        </div>

        <nav className={`nav ${showNav ? "show" : ""}`}>
          <button className="close-btn" onClick={toggleNav}>
            <Close />
          </button>
          <a href="/">Home</a>
          <a href="/used-cars">Find Cars</a>
          <a href="/favourites">Favourites</a>
          <a href="/chats">Chats</a>
          <a href="/about-us">About-Us</a>
          <a href="/reviews">Reviews</a>
          <a href="/blogs">Blogs</a>
          <button className="login-btn" onClick={navigateToLogin}>
            <Person /> Login
          </button>
        </nav>

        <div className="icons">
          <button className="sell-btn">
            <AddBox /> Sell
          </button>
          <Search className="search-icon" onClick={toggleSearch} />
          <Menu className="menu-icon" onClick={toggleNav} />
        </div>

        {showNav && <div className="-1" onClick={toggleNav}></div>}
      </header>
    </>
  );
}

export default Header;
