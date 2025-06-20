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
const LOCAL_STORAGE_KEY = "previousCarSearches";

function Header() {
  const [showNav, setShowNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const [logoSize, setLogoSize] = useState({ width: "220px", height: "70px" });
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);
  const [showResults, setShowResults] = useState(false);
  const { user } = useContext(UserContext);
  const [isListening, setIsListening] = useState(false);
  const [previousSearches, setPreviousSearches] = useState(() => {
    const storedSearches = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedSearches ? JSON.parse(storedSearches) : [];
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setShowHeader(true); // Scrolling up
      } else {
        setShowHeader(false); // Scrolling down
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSellCar = () => {
    if (!user) {
      handleOpen();
    } else {
      window.location.href = "/car/add";
    }
  };

  const handleNavigateToChat = async () => {
    if (!user) {
      handleOpen();
    } else {
      window.location.href = "/chats";
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
        setShowResults(true);
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

  // const handleSearch = async (e) => {
  //   setSearchKey(e.target.value);
  //   const currentSearchValue = e.target.value;

  //   if (currentSearchValue.trim().length > 3 && !previousSearches.includes(currentSearchValue)) {
  //     setPreviousSearches((prevSearches) => [...prevSearches, currentSearchValue]);
  //   }
  // };

  const handleSearch = async (e) => {
    const currentSearchValue = e.target.value;
    setSearchKey(currentSearchValue);

    if (currentSearchValue.trim().length > 3) {
      setPreviousSearches((prevSearches) => {
        // Create a new array without the currentSearchValue if it already exists
        const filteredSearches = prevSearches.filter(
          (search) => search !== currentSearchValue
        );
        // Add the currentSearchValue to the end of the new array
        return [...filteredSearches, currentSearchValue];
      });
    }
  };

  const handleResultClick = () => {
    setShowResults(false);
    setSearchKey("");
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(previousSearches));
  }, [previousSearches]);

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

    setIsListening(true); // 👈 Change image

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      setSearchKey(transcript);
    };

    recognition.onend = () => {
      setIsListening(false); // 👈 Reset image
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false); // 👈 Also reset on error
    };
  };

  return (
    <div className="header-container">
      <header className={`header ${showHeader ? "show" : "hide"}`}>
        <div className="logo">
          <a href="/" title="logo">
            <img
              src="/images/logo.png"
              className="brand-name"
              style={logoSize}
              alt="Logo"
              title="brand-logo"
            />
          </a>
        </div>

        <div className={`search ${showSearch ? "mobile-search" : ""}`}>
          <input
            type="text"
            placeholder="Search for car name or brand or location"
            onChange={handleSearch}
            value={searchKey}
          />
          <button
            className="voice-search-btn"
            onClick={startListening}
            aria-label="voice-search"
          >
            <img
              className={isListening ? "listening-animation" : ""}
              style={{ width: "25px" }}
              src={isListening ? "/images/sound-wave.png" : "/images/voice.png"}
              alt="Voice Search"
            />
          </button>

          <button aria-label="search-button">
            <Search />
          </button>
        </div>

        {showResults && searchKey.trim() != "" && (
          <div className="search-results-container">
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <a
                  href={`/car-details/${result._id}`}
                  key={index}
                  className="search-card"
                  onClick={handleResultClick}
                  title={result.brand}
                >
                  <div className="search-card-image">
                    <img
                      src={result.images[0]}
                      alt={result.car_name}
                      title="search-result-car-img"
                    />
                  </div>
                  <div className="search-card-content">
                    <div className="d-flex justify-content-between">
                      <h3>{result.car_name}</h3>
                      <p className="search-card-meta">
                        {result.brand} • {result.model} • {result.year}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="search-card-price">
                        ${result?.price?.toLocaleString()}
                      </p>
                      <p className="search-card-location">
                        {" "}
                        <img
                          style={{ width: "20px", height: "20px" }}
                          src="/images/gps.png"
                          alt="location"
                        />{" "}
                        {result.place}
                      </p>
                    </div>
                  </div>
                </a>
              ))
            ) : (
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
          <a href="/" title="home">
            Home
          </a>
          <a href="/used-cars" title="find used cars">
            Find-Cars
          </a>
          <a href="/favourites" title="saved cars">
            Favourites
          </a>
          {user && (
            <a href="/chats" title="chats">
              Chats
            </a>
          )}
          <a href="/about-us" title="about us">
            About-Us
          </a>
          <a href="/reviews" title="reviews">
            Reviews
          </a>
          <a href="/blogs" title="blogs">
            Blogs
          </a>
          <a href="/contact-us" title="contact us">
            Contact-Us
          </a>
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
          {user && (
            <AccountMenu
              profileImage={user?.profile_picture ?? null}
              username={user?.first_name ?? "A"}
            />
          )}
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
                You need to create account to add car
              </span>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#606cbc",
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
    </div>
  );
}

export default Header;
