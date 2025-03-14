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

const images = [
  "https://t3.ftcdn.net/jpg/07/48/59/38/360_F_748593837_mWVU6MyzgP9yeAdDJW6UkReK7GGGTSbH.jpg",
  "https://i.pinimg.com/736x/be/83/60/be83607be6a98648c47b8563b8b7edca.jpg",
];

function Header() {
  const [showNav, setShowNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <header className="header">
        <div className="logo">WheelzLoop</div>
        <div className={`search ${showSearch ? "mobile-search" : ""}`}>
          <input type="text" placeholder="Search for cars, mobiles, etc." />
          <button>
            <Search />
          </button>
        </div>
        <nav className={`nav ${showNav ? "show" : ""}`}>
          <a href="#">Home</a>
          <a href="#">Find Cars</a>
          <a href="#">Favourites</a>
          <a href="#">Chats</a>
          <a href="#">Reviews</a>
          <a href="#">Blogs</a>
          <button className="login-btn">
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
      <div className="mt-4">
        <Carousel images={images} />
      </div>
    </>
  );
}

export default Header;
