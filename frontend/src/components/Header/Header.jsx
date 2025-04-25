import React, { useContext, useEffect, useState } from "react";
import { Search, Menu, Person, AddBox, Close } from "@mui/icons-material";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SEARCH_URL } from "../../config/api";
import { UserContext } from "../../hooks/UserContext";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import AccountDropdown from "../AccountDropdown/AccountMenu";
import AccountMenu from "../AccountDropdown/AccountMenu";
import SubHeader from "../SubHeader/SubHeader";
import MailIcon from "@mui/icons-material/Mail";

function Header() {
  const [showNav, setShowNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const [logoSize, setLogoSize] = useState({ width: "220px", height: "70px" });
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showResults, setShowResults] = useState(false);
  const { user } = useContext(UserContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSellCar = () => {
    if (!user) {
      handleOpen();
    } else {
      window.location.href = "/car/add";
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
          {!user && (
            <button className="login-btn" onClick={navigateToLogin}>
              <Person /> Login
            </button>
          )}
        </nav>

        <div className="icons">
          <button className="sell-btn" onClick={handleSellCar}>
            <AddBox /> Sell
          </button>
          {isMobile && (
            <Search
              className="search-icon"
              style={{ float: "right", position: "relative" }}
              onClick={toggleSearch}
            />
          )}
          <AccountMenu />
          {isMobile && (
            <>
              <Menu className="menu-icon" onClick={toggleNav} />
              {/* <Search className="search-icon" onClick={toggleSearch} /> */}
              {/* <Menu className="menu-icon" onClick={toggleNav} /> */}
            </>
          )}
        </div>

        {showNav && <div className="" onClick={toggleNav}></div>}
      </header>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                padding: "24px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                maxWidth: "400px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  color: "#333",
                }}
              >
                You need to create account to add review
              </span>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#30bfa1",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "background-color 0.2s",
                  ":hover": {
                    backgroundColor: "#30bfa1",
                  },
                }}
                onClick={() => (window.location.href = "/signin")}
              >
                Go to login
              </button>
            </div>
          </>
        </Box>
      </Modal>
    </>
  );
}

export default Header;
