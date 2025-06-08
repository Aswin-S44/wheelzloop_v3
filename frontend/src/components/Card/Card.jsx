import React, { useState } from "react";
import "./Card.css";
import ActionMenu from "../ActionMenu/ActionMenu";
import axios from "axios";
import { ADD_CAR_VIEWS_COUNT } from "../../config/api";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SettingsIcon from "@mui/icons-material/Settings";
import { formatViews } from "../../utils/utils";
import { ToastContainer, toast } from "react-toastify";

function Card({ car, editable = false, category }) {
  const [saved, setSaved] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const handleNavigateToCar = async () => {
    window.location.href = `/car/${car._id}`;
    await axios.post(`${ADD_CAR_VIEWS_COUNT}/${car._id}`);
  };

  const addToFav = async (id) => {
    setSaved(!saved);
    let favCars = JSON.parse(localStorage.getItem("fav-cars")) || [];

    if (!favCars.includes(id)) {
      favCars.push(id);
      localStorage.setItem("fav-cars", JSON.stringify(favCars));
      toast.success("Added to favourites");
      setIsFavourite(true);
    } else {
      favCars = favCars.filter((favId) => favId !== id);

      localStorage.setItem("fav-cars", JSON.stringify(favCars));
      toast.error("Removed from favourites");
      setIsFavourite(false);
    }
  };

  return (
    <div className="card">
      <div className="card-image-container">
        <img
          src={car?.images[0]}
          alt="Car"
          className="card-image"
          title={car?.car_name || "car image"}
          onClick={handleNavigateToCar}
        />

        {category && <span className="category-badge">{category}</span>}
        <button className="favorite-btn" id="favorite-btn">
          {editable && <ActionMenu id={car._id} />}
          {!editable && (
            <FavoriteBorderIcon
              style={{ fontSize: "20px" }}
              onClick={() => addToFav(car?._id)}
              className={isFavourite ? "saved" : ""}
            />
          )}
        </button>
      </div>
      <div className="card-details">
        <h3 className="car-name">{car?.car_name ?? "_"}</h3>
        <div className="car-specs-container">
          <div className="spec-item">
            <DirectionsCarIcon style={{ fontSize: "16px", color: "#555" }} />
            <span>{car?.year ?? "_"}</span>
          </div>
          <div className="spec-item">
            <LocalGasStationIcon style={{ fontSize: "16px", color: "#555" }} />
            <span>{car?.fuel_type ?? "_"}</span>
          </div>
          <div className="spec-item">
            <SettingsIcon style={{ fontSize: "16px", color: "#555" }} />
            <span>{car?.transmission ?? "_"}</span>
          </div>
        </div>
        <div className="price-section">
          <span className="current-price">
            ₹{car?.price?.toLocaleString() ?? "_"}
          </span>
          {car?.original_price && (
            <span className="original-price">
              ₹{car.original_price.toLocaleString()}
            </span>
          )}
        </div>
        <div className="card-footer">
          <p className="location">📍 {car?.place ?? "_"}</p>
          <div className="visitors">
            <RemoveRedEyeIcon
              style={{ fontSize: "16px", marginRight: "4px" }}
            />
            <span>{formatViews(car?.views?.toLocaleString())}</span>
          </div>
        </div>
        <button className="view-details-btn" onClick={handleNavigateToCar}>
          View Details
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Card;
