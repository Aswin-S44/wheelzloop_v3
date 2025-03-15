import React, { useState } from "react";
import {
  Search,
  Menu,
  Person,
  AddBox,
  Chat,
  Favorite,
  Home,
  RateReview,
  DirectionsCar,
  Article,
} from "@mui/icons-material";
import "./Header.css";
import Carousel from "../Carousel/Carousel";
import { useNavigate } from "react-router-dom";

const images = [
  "https://t3.ftcdn.net/jpg/07/48/59/38/360_F_748593837_mWVU6MyzgP9yeAdDJW6UkReK7GGGTSbH.jpg",
  "https://i.pinimg.com/736x/be/83/60/be83607be6a98648c47b8563b8b7edca.jpg",
];

function Header() {
  const [showNav, setShowNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/signin");
  };

  return (
    <>
      <header className="header">
        <div className="logo">WheelzLoop</div>
        <div className={`search ${showSearch ? "mobile-search" : ""}`}>
          <input type="text" placeholder="Search for cars, mobiles, etc." />
          <button aria-label="search-button">
            <Search />
          </button>
        </div>
        <nav className={`nav ${showNav ? "show" : ""}`}>
          <a href="#">Home</a>
          <a href="/used-cars">Find Cars</a>
          <a href="/favourites">Favourites</a>
          <a href="#">Chats</a>
          <a href="#">Reviews</a>
          <a href="/blogs">Blogs</a>
          <button className="login-btn" onClick={navigateToLogin}>
            <Person /> Login
          </button>
        </nav>
        <div className="icons">
          <button className="sell-btn">
            <AddBox /> Sell
          </button>
          <Search
            className="search-icon"
            onClick={() => setShowSearch(!showSearch)}
          />
          <Menu className="menu-icon" onClick={() => setShowNav(!showNav)} />
        </div>
      </header>
    </>
  );
}

export default Header;
