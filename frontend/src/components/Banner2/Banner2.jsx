import React, { useState, useEffect } from "react";
import "./Banner2.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { SEARCH_URL } from "../../config/api";
import { useNavigate } from "react-router-dom";

function Banner2() {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const searchCar = async (name) => {
    if (name.length > 2) {
      setIsSearching(true);
      try {
        const res = await axios.get(`${SEARCH_URL}?key=${name}`);
        if (res && res?.data && res.data?.data) {
          setSearchResults(res.data.data.slice(0, 5));
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchKey.trim()) {
        searchCar(searchKey);
      }
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchKey]);

  const handleResultClick = (carId) => {
    setShowSearchModal(false);
    setSearchKey("");
    setSearchResults([]);
    navigate(`/car/${carId}`);
  };

  return (
    <div className="banner-main-wrapper">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 banner-left">
            <div className="collection-tag">
              <span className="tag-dot"></span>
              PREMIUM COLLECTION
            </div>
            <h1 className="main-headline">
              Building <br />a better{" "}
              <span className="highlight-text">
                drive
                <span className="heart-badge">
                  <FavoriteIcon />
                </span>
              </span>
            </h1>
            <p className="description-text">
              Anyone can sell you a car, but no one can beat our hand-picked
              luxury collections. Discover the drive you deserve.
            </p>

            <div className="cta-group">
              <button
                className="shop-btn"
                onClick={() => navigate("/used-cars")}
              >
                Start shopping <ArrowRightAltIcon className="ms-2" />
              </button>
              <button
                className="search-trigger-btn"
                onClick={() => setShowSearchModal(true)}
              >
                <div className="search-circ">
                  <SearchIcon />
                </div>
                <span>Quick Search</span>
              </button>
              <button className="play-btn">
                <div className="play-circ">
                  <PlayArrowIcon />
                </div>
                <span>Play video</span>
              </button>
            </div>

            <div className="stats-row">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Luxury Cars</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50k+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>

            <div className="testimonial-box d-none d-lg-block">
              <div className="quote-icon">“</div>
              <p>
                I just love WheelzLoop! Their cars are so premium. I can't think
                of buying from anyone else but them.
              </p>
              <div className="rating-row">
                <div className="stars-gold">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
                <span>4.9 Overall rating</span>
              </div>
            </div>
          </div>

          <div className="col-lg-6 banner-right">
            <div className="visual-container">
              <div className="circle-bg circle-orange"></div>
              <div className="circle-bg circle-blue"></div>
              <div className="circle-bg circle-pink"></div>
              <div className="circle-bg circle-purple"></div>

              <img
                src="/images/wheelzloop-main-img.webp"
                alt="Car"
                className="hero-car-image"
              />

              <div className="floating-info-card">
                <div className="card-thumb">
                  <img
                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=150"
                    alt="Health"
                  />
                </div>
                <div className="card-details">
                  <h6>Certified Health</h6>
                  <p>Blog | Article</p>
                </div>
                <div className="card-heart">
                  <FavoriteIcon />
                </div>
              </div>

              <div className="floating-social-pill">
                <div className="social-icon">
                  <ThumbUpIcon />
                </div>
                <div className="avatar-stack">
                  <img src="https://i.pravatar.cc/100?u=a" alt="u" />
                  <img src="https://i.pravatar.cc/100?u=b" alt="u" />
                  <img src="https://i.pravatar.cc/100?u=c" alt="u" />
                </div>
              </div>
              <div className="sunflower-decor">🌻</div>
            </div>
          </div>
        </div>
      </div>

      {showSearchModal && (
        <div
          className="search-modal-overlay"
          onClick={() => setShowSearchModal(false)}
        >
          <div
            className="search-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-modal-header">
              <h3>Find Your Dream Car</h3>
              <button
                className="close-modal-btn"
                onClick={() => setShowSearchModal(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="search-modal-input-wrapper">
              <SearchIcon className="search-modal-icon" />
              <input
                type="text"
                placeholder="Search by make, model, or location..."
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                autoFocus
              />
              {isSearching && <div className="search-spinner"></div>}
            </div>
            <div className="search-modal-results">
              {searchResults.length > 0 ? (
                searchResults.map((car) => (
                  <div
                    key={car._id}
                    className="search-result-card"
                    onClick={() => handleResultClick(car._id)}
                  >
                    <div className="result-card-image">
                      <img src={car.images?.[0]} alt={car.car_name} />
                    </div>
                    <div className="result-card-info">
                      <h4>{car.car_name}</h4>
                      <p>
                        {car.brand} • {car.model} • {car.year}
                      </p>
                      <div className="result-card-meta">
                        <span className="result-price">
                          ${car.price?.toLocaleString()}
                        </span>
                        <span className="result-location">
                          <LocationOnIcon />
                          {car.place}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : searchKey.trim() && !isSearching ? (
                <div className="no-results-found">
                  <SearchIcon />
                  <p>No cars found for "{searchKey}"</p>
                  <button onClick={() => navigate("/used-cars")}>
                    Browse All Cars
                  </button>
                </div>
              ) : searchKey.trim() === "" ? (
                <div className="search-suggestions">
                  <h4>Popular Searches</h4>
                  <div className="suggestion-tags">
                    <span onClick={() => setSearchKey("BMW")}>BMW</span>
                    <span onClick={() => setSearchKey("Mercedes")}>
                      Mercedes
                    </span>
                    <span onClick={() => setSearchKey("Audi")}>Audi</span>
                    <span onClick={() => setSearchKey("Tesla")}>Tesla</span>
                    <span onClick={() => setSearchKey("Luxury")}>Luxury</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Banner2;
