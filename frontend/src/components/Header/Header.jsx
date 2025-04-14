import React, { useEffect, useState } from "react";
import { Search, Menu, Person, AddBox, Close } from "@mui/icons-material";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SEARCH_URL } from "../../config/api";

function Header() {
  const [showNav, setShowNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const [logoSize, setLogoSize] = useState({ width: "220px", height: "70px" });
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showResults, setShowResults] = useState(false);

  const searchCar = async (name) => {
    if (name.length > 0) {
      const res = await axios.get(`${SEARCH_URL}?key=${name}`);
      if (res && res?.data && res.data?.data && res.data?.data?.length > 0) {
        setSearchResults(res.data.data);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  useEffect(() => {
    searchCar(searchKey);
  }, [searchKey]);

  useEffect(() => {
    const updateLogoSize = () => {
      if (window.innerWidth < 768) {
        setLogoSize({ width: "150px", height: "50px" });
      } else {
        setLogoSize({ width: "220px", height: "70px" });
      }
    };

    updateLogoSize();
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
    setShowResults(false);
    setSearchKey("");
  };

  const handleSearch = async (e) => {
    setSearchKey(e.target.value);
  };

  const handleResultClick = () => {
    setShowResults(false);
    setSearchKey("");
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <a href="/">
            <img
              src="/images/logo.png"
              className="brand-name"
              style={logoSize}
              alt="Logo"
            />
          </a>
        </div>

        <div className={`search ${showSearch ? "mobile-search" : ""}`}>
          <input
            type="text"
            placeholder="Search for cars, mobiles, etc."
            onChange={handleSearch}
            value={searchKey}
          />
          <button aria-label="search-button">
            <Search />
          </button>
        </div>

        {showResults && (
          <div className="search-results-container">
            {searchResults.length > 0
              ? searchResults.map((result, index) => (
                  <a
                    href={`/car-details/${result._id}`}
                    key={index}
                    className="search-card"
                    onClick={handleResultClick}
                  >
                    <div className="search-card-image">
                      <img src={result.images[0]} alt={result.car_name} />
                    </div>
                    <div className="search-card-content">
                      <h3>{result.car_name}</h3>
                      <p className="search-card-meta">
                        {result.brand} • {result.model} • {result.year}
                      </p>
                      <p className="search-card-price">
                        ${result?.price?.toLocaleString()}
                      </p>
                      <p className="search-card-location">{result.place}</p>
                    </div>
                  </a>
                ))
              : searchResults.length == 0 && (
                  <a className="search-card">
                    <div>No results found</div>
                  </a>
                )}
          </div>
        )}

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
          {console.log("isMobile==========", isMobile)}
          {isMobile && (
            <>
              <Search className="search-icon" onClick={toggleSearch} />
              <Menu className="menu-icon" onClick={toggleNav} />
            </>
          )}
          <Menu className="menu-icon" onClick={toggleNav} />
        </div>

        {showNav && <div className="" onClick={toggleNav}></div>}
      </header>
    </>
  );
}

export default Header;
