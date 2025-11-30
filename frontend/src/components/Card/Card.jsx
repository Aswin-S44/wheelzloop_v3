import React, { useEffect, useState } from "react";
import "./Card.css";
import ActionMenu from "../ActionMenu/ActionMenu";
import axios from "axios";
import { ADD_CAR_VIEWS_COUNT } from "../../config/api";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { formatViews } from "../../utils/utils";
import { ToastContainer, toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// Icons for the "Smart Specs"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SettingsIcon from "@mui/icons-material/Settings";

function Card({ car, editable = false, category }) {
  const [favCars, setFavCars] = useState([]);

  useEffect(() => {
    const favsCarss = JSON.parse(localStorage.getItem("fav-cars")) || [];
    setFavCars(favsCarss);
  }, [car]);

  const isFavourite = favCars.includes(car?._id);

  const handleNavigateToCar = async () => {
    window.location.href = `/car/${car._id}`;
    await axios.post(`${ADD_CAR_VIEWS_COUNT}/${car._id}`);
  };

  const addToFav = (e) => {
    e.stopPropagation();
    let updatedFavCars;

    if (isFavourite) {
      updatedFavCars = favCars.filter((favId) => favId !== car._id);
      toast.error("Removed from favourites");
    } else {
      updatedFavCars = [...favCars, car._id];
      toast.success("Added to favourites");
    }

    localStorage.setItem("fav-cars", JSON.stringify(updatedFavCars));
    setFavCars(updatedFavCars);
  };

  return (
    <div className="pro-card" onClick={handleNavigateToCar}>
      {/* Image Side */}
      <div className="pro-card-image-wrap">
        <img
          src={car?.images[0]}
          alt={car?.car_name}
          className="pro-card-img"
          loading="lazy"
        />

        <div className="pro-card-badges">
          {category && <span className="badge category-badge">{category}</span>}
        </div>

        <div className="pro-card-actions" onClick={(e) => e.stopPropagation()}>
          {editable ? (
            <ActionMenu id={car._id} />
          ) : (
            <button
              className={`fav-icon-btn ${isFavourite ? "active" : ""}`}
              onClick={addToFav}
            >
              {isFavourite ? <FaHeart /> : <FaRegHeart />}
            </button>
          )}
        </div>
      </div>

      {/* Content Side */}
      <div className="pro-card-content">
        <div className="pro-card-header">
          <h3 className="car-title">{car?.car_name || "N/A"}</h3>
          <div className="car-price">
            ₹{car?.price?.toLocaleString() || "0"}
          </div>
        </div>

        {/* Desktop Specs (Pills) */}
        <div className="pro-card-specs desktop-specs">
          <div className="spec-pill">{car?.year}</div>
          <div className="spec-pill">{car?.fuel_type}</div>
          <div className="spec-pill">{car?.transmission}</div>
        </div>

        {/* Mobile Specs (Text Row) */}
        <div className="mobile-specs-row">
          <span>{car?.year}</span>
          <span className="dot">•</span>
          <span>{car?.fuel_type}</span>
          <span className="dot">•</span>
          <span>{car?.transmission}</span>
        </div>

        <div className="pro-card-divider"></div>

        <div className="pro-card-footer">
          <div className="footer-item location">
            <LocationOnIcon fontSize="inherit" />
            <span>{car?.place || "N/A"}</span>
          </div>
          <div className="footer-item views">
            <RemoveRedEyeIcon fontSize="inherit" />
            <span>{formatViews(car?.views?.toLocaleString())}</span>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar
      />
    </div>
  );
}

export default Card;
