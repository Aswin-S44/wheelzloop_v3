import React, { useContext, useEffect, useState } from "react";
import {
  Search,
  Menu,
  Person,
  AddBox,
  Close,
  Favorite,
  ShoppingCart,
  Mic,
  LocationOn,
  Dashboard,
  Storefront,
  Reviews,
  ContactPhone,
  Info,
  DirectionsCar,
  ChevronRight,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SEARCH_URL } from "../../config/api";
import { UserContext } from "../../hooks/UserContext";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import AccountMenu from "../AccountDropdown/AccountMenu";
import "./Header.css";

const LOCAL_STORAGE_KEY = "previousCarSearches";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const [showResults, setShowResults] = useState(false);
  const { user } = useContext(UserContext);
  const [isListening, setIsListening] = useState(false);
  const [previousSearches, setPreviousSearches] = useState(() => {
    const storedSearches = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedSearches ? JSON.parse(storedSearches) : [];
  });
  const [favouriteCount, setFavouriteCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (window.scrollY < lastScrollY || window.scrollY < 50) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const updateMobileView = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    updateMobileView();
    window.addEventListener("resize", updateMobileView);
    return () => window.removeEventListener("resize", updateMobileView);
  }, []);

  useEffect(() => {
    if (user) {
      fetchFavouriteCount();
      fetchCartCount();
    }
  }, [user]);

  const fetchFavouriteCount = async () => {
    try {
      setFavouriteCount(0);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  const fetchCartCount = async () => {
    try {
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

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
    border: "none",
    borderRadius: "28px",
    boxShadow: "0 25px 70px rgba(0,0,0,0.25)",
    p: 4,
  };

  const searchCar = async (name) => {
    if (name.length > 0) {
      try {
        const res = await axios.get(`${SEARCH_URL}?key=${name}`);
        if (res && res?.data && res.data?.data && res.data?.data?.length > 0) {
          setSearchResults(res.data.data);
          setShowResults(true);
        } else {
          setSearchResults([]);
          setShowResults(true);
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
        setShowResults(true);
      }
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchCar(searchKey);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchKey]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(previousSearches));
  }, [previousSearches]);

  const navigateToLogin = () => {
    navigate("/signin");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setShowResults(false);
      setSearchKey("");
    }
  };

  const handleSearch = async (e) => {
    const currentSearchValue = e.target.value;
    setSearchKey(currentSearchValue);

    if (currentSearchValue.trim().length > 3) {
      setPreviousSearches((prevSearches) => {
        const filteredSearches = prevSearches.filter(
          (search) => search !== currentSearchValue
        );
        return [...filteredSearches, currentSearchValue];
      });
    }
  };

  const handleResultClick = () => {
    setShowResults(false);
    setSearchKey("");
    setIsMenuOpen(false);
    setShowSearch(false);
    document.body.style.overflow = "auto";
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
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      setSearchKey(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
  };

  const navItems = [
    { path: "/", label: "Home", icon: Dashboard },
    { path: "/used-cars", label: "Find Cars", icon: Storefront },
    { path: "/favourites", label: "Favourites", icon: Favorite },
    { path: "/about-us", label: "About Us", icon: Info },
    { path: "/reviews", label: "Reviews", icon: Reviews },
    { path: "/contact-us", label: "Contact Us", icon: ContactPhone },
  ];

  return (
    <div className="header-container">
      <header
        className={`header ${showHeader ? "show" : "hide"} ${
          scrolled ? "scrolled" : ""
        }`}
      >
        <div className="header-main">
          <div className="container">
            <div className="header-content">
              <div className="logo">
                <a href="/">
                  <DirectionsCar className="logo-icon" />
                  <span>
                    Car<span>Auras</span>
                  </span>
                </a>
              </div>

              <div
                className={`search-wrapper ${
                  showSearch ? "mobile-search-active" : ""
                }`}
              >
                <div className="search-bar">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by make, model, or location..."
                    onChange={handleSearch}
                    value={searchKey}
                    autoFocus={showSearch}
                  />
                  <button
                    className={`voice-btn ${isListening ? "listening" : ""}`}
                    onClick={startListening}
                  >
                    <Mic />
                  </button>
                </div>

                {showResults && searchKey.trim() !== "" && (
                  <>
                    <div
                      className="search-overlay"
                      onClick={() => setShowResults(false)}
                    ></div>
                    <div className="search-results">
                      <div className="search-results-header">
                        <h4>Search Results</h4>
                        <button onClick={() => setShowResults(false)}>
                          <Close />
                        </button>
                      </div>
                      <div className="search-results-list">
                        {searchResults.length > 0 ? (
                          searchResults.map((result, index) => (
                            <a
                              href={`/car/${result._id}`}
                              key={index}
                              className="result-item"
                              onClick={handleResultClick}
                            >
                              <div className="result-image">
                                <img
                                  src={result.images[0]}
                                  alt={result.car_name}
                                />
                              </div>
                              <div className="result-info">
                                <h5>{result.car_name}</h5>
                                <p>
                                  {result.brand} • {result.model} •{" "}
                                  {result.year}
                                </p>
                                <div className="result-meta">
                                  <span className="price">
                                    ${result?.price?.toLocaleString()}
                                  </span>
                                  <span className="location">
                                    <LocationOn />
                                    {result.place}
                                  </span>
                                </div>
                              </div>
                            </a>
                          ))
                        ) : (
                          <div className="no-results">
                            <Search />
                            <p>No cars found for "{searchKey}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="actions">
                <button
                  className="action-btn"
                  onClick={() => navigate("/favourites")}
                >
                  <Favorite />
                  {favouriteCount > 0 && (
                    <span className="count">{favouriteCount}</span>
                  )}
                </button>
                <button
                  className="action-btn"
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingCart />
                  {cartCount > 0 && <span className="count">{cartCount}</span>}
                </button>
                <button className="sell-btn" onClick={handleSellCar}>
                  <AddBox />
                  <span>Sell</span>
                </button>
                {!isMobile &&
                  (user ? (
                    <AccountMenu
                      profileImage={user?.profile_picture ?? null}
                      username={user?.first_name ?? "A"}
                    />
                  ) : (
                    <button className="login-btn" onClick={navigateToLogin}>
                      <Person />
                      <span>Sign In</span>
                    </button>
                  ))}
                {isMobile && (
                  <>
                    <button className="mobile-search" onClick={toggleSearch}>
                      <Search />
                    </button>
                    <button className="mobile-menu" onClick={toggleMenu}>
                      <Menu />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {!isMobile && (
          <nav className="nav">
            <div className="container">
              <ul className="nav-list">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <a href={item.path} onClick={handleResultClick}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}
      </header>

      <div className={`mobile-nav ${isMenuOpen ? "active" : ""}`}>
        <div className="mobile-nav-header">
          <div className="logo">
            <DirectionsCar />
            <span>
              Car<span>Auras</span>
            </span>
          </div>
          <button className="close-btn" onClick={toggleMenu}>
            <Close />
          </button>
        </div>
        {!user && (
          <div className="mobile-auth">
            <button className="auth-login" onClick={navigateToLogin}>
              <Person />
              Sign In
            </button>
            <button
              className="auth-register"
              onClick={() => navigate("/signup")}
            >
              Register
            </button>
          </div>
        )}
        <ul className="mobile-nav-list">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <a href={item.path} onClick={handleResultClick}>
                  <Icon />
                  <span>{item.label}</span>
                  <ChevronRight />
                </a>
              </li>
            );
          })}
        </ul>
        {user && (
          <div className="mobile-user">
            <AccountMenu
              profileImage={user?.profile_picture ?? null}
              username={user?.first_name ?? "A"}
            />
          </div>
        )}
      </div>
      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="modal-content">
            <AddBox className="modal-icon" />
            <h3>Account Required</h3>
            <p>You need to create an account to sell your car</p>
            <button
              className="modal-btn"
              onClick={() => (window.location.href = "/signin")}
            >
              Sign In Now
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Header;
