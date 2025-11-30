import React, { useContext, useEffect, useState } from "react";
import {
  Search,
  Menu,
  Person,
  AddBox,
  Close,
  FavoriteBorder,
  ExpandMore,
} from "@mui/icons-material";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SEARCH_URL } from "../../config/api";
import { UserContext } from "../../hooks/UserContext";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import AccountMenu from "../AccountDropdown/AccountMenu";

const LOCAL_STORAGE_KEY = "previousCarSearches";

function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const { user } = useContext(UserContext);
  const [isListening, setIsListening] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const [previousSearches, setPreviousSearches] = useState(() => {
    const storedSearches = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedSearches ? JSON.parse(storedSearches) : [];
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        if (window.scrollY < lastScrollY) {
          setShowHeader(true);
        } else {
          setShowHeader(false);
        }
      } else {
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const searchCar = async (name) => {
    if (name.length > 0) {
      try {
        const res = await axios.get(`${SEARCH_URL}?key=${name}`);
        if (res && res?.data && res.data?.data) {
          setSearchResults(res.data.data);
          setShowResults(true);
        } else {
          setSearchResults([]);
          setShowResults(true);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchCar(searchKey);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchKey]);

  const handleSearchChange = (e) => {
    setSearchKey(e.target.value);
  };

  const handleResultClick = () => {
    setShowResults(false);
    setSearchKey("");
    setShowMobileMenu(false);
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      console.log("transcript----------", transcript);
      setSearchKey(transcript);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
  };

  const handleSellCar = () => {
    if (!user) setOpenModal(true);
    else window.location.href = "/car/add";
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    borderRadius: "12px",
    boxShadow: 24,
    p: 4,
    outline: "none",
  };

  return (
    <>
      <div
        className={`ecommerce-header-wrapper ${
          showHeader ? "sticky-visible" : "sticky-hidden"
        }`}
      >
        <div className="top-bar">
          <div className="container top-bar-content">
            <span className="top-text">
              Welcome to CarAuras - Premium Used Cars
            </span>
            <div className="top-links">
              <a href="/about-us">About</a>
              <a href="/contact-us">Help</a>
              {!user && <a href="/signin">Sign In / Register</a>}
            </div>
          </div>
          <div className="main-header">
            <div className="container main-header-content">
              <div className="mobile-toggle">
                <Menu onClick={() => setShowMobileMenu(true)} />
              </div>

              <div className="brand-logo">
                <a href="/">CarAuras</a>
              </div>

              <div className="search-container">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search by brand, model, or year..."
                    value={searchKey}
                    onChange={handleSearchChange}
                  />
                  <button
                    className={`voice-btn ${isListening ? "active" : ""}`}
                    onClick={startListening}
                  >
                    <img
                      src={
                        isListening
                          ? "/images/sound-wave.png"
                          : "/images/voice.png"
                      }
                      alt="mic"
                    />
                  </button>
                  <button className="search-btn">
                    <Search />
                  </button>
                </div>

                {showResults && searchKey && (
                  <div className="search-dropdown">
                    {searchResults.length > 0 ? (
                      searchResults.map((result, index) => (
                        <a
                          href={`/car/${result._id}`}
                          key={index}
                          className="search-item"
                          onClick={handleResultClick}
                        >
                          <img src={result.images[0]} alt={result.car_name} />
                          <div className="item-info">
                            <h4>{result.car_name}</h4>
                            <span>
                              {result.brand} • {result.year}
                            </span>
                            <span className="price">
                              ${result?.price?.toLocaleString()}
                            </span>
                          </div>
                        </a>
                      ))
                    ) : (
                      <div className="no-results">
                        No cars found matching "{searchKey}"
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="header-actions">
                <a href="/favourites" className="action-item wishlist">
                  <FavoriteBorder />
                  <span className="action-label">Saved</span>
                </a>

                {user ? (
                  <div className="action-item user-menu">
                    <AccountMenu
                      profileImage={user?.profile_picture}
                      username={user?.first_name}
                    />
                  </div>
                ) : (
                  <div
                    className="action-item user-auth"
                    onClick={() => navigate("/signin")}
                  >
                    <Person />
                    <div className="auth-text">
                      <small>Hello, Sign in</small>
                      <span>My Account</span>
                    </div>
                  </div>
                )}

                <button className="sell-car-btn" onClick={handleSellCar}>
                  <AddBox fontSize="small" /> SELL CAR
                </button>
              </div>
            </div>
          </div>
          {/* <hr /> */}
          <nav className="nav-bar">
            <div className="container nav-content">
              <div className="nav-links">
                <a href="/">Home</a>
                <a href="/used-cars">Browse All Cars</a>
                <a href="/reviews">Reviews</a>
                <a href="/blogs">Latest News</a>
                <a href="/about-us">About-Us</a>
                <a href="/contact-us">Contact</a>
              </div>
            </div>
          </nav>
        </div>
        {/* <hr /> */}
      </div>

      <div className={`mobile-drawer ${showMobileMenu ? "open" : ""}`}>
        <div className="drawer-header">
          <h3>Menu</h3>
          <Close onClick={() => setShowMobileMenu(false)} />
        </div>
        <div className="drawer-search">
          <input
            type="text"
            placeholder="Search..."
            value={searchKey}
            onChange={handleSearchChange}
          />
          {showResults && searchKey && (
            <div className="mobile-search-results">
              {searchResults.slice(0, 5).map((res, idx) => (
                <a
                  href={`/car/${res._id}`}
                  key={idx}
                  onClick={handleResultClick}
                >
                  {res.car_name}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="drawer-links">
          <a href="/">Home</a>
          <a href="/used-cars">Buy Car</a>
          <a href="#" onClick={handleSellCar}>
            Sell Car
          </a>
          <a href="/favourites">Favourites</a>
          <a href="/reviews">Reviews</a>
          {!user ? (
            <a href="/signin" className="highlight-link">
              Login / Register
            </a>
          ) : (
            <a href="/profile" className="highlight-link">
              My Profile
            </a>
          )}
        </div>
      </div>
      {showMobileMenu && (
        <div
          className="drawer-overlay"
          onClick={() => setShowMobileMenu(false)}
        ></div>
      )}

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <div className="auth-modal-content">
            <h3>Start Selling Today</h3>
            <p>You need an account to list your car on CarAuras.</p>
            <div className="modal-actions">
              <button
                className="modal-btn login"
                onClick={() => (window.location.href = "/signin")}
              >
                Log In
              </button>
              <button
                className="modal-btn cancel"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default Header;
