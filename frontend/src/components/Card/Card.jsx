import React from "react";
import "./Card.css";
import ActionMenu from "../ActionMenu/ActionMenu";
import axios from "axios";
import { ADD_CAR_VIEWS_COUNT } from "../../config/api";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

function Card({ car, editable = false, category }) {
  const handleNavigateToCar = async () => {
    window.location.href = `/car/${car._id}`;
    await axios.post(`${ADD_CAR_VIEWS_COUNT}/${car._id}`);
  };
  return (
    <div className="card" onClick={handleNavigateToCar}>
      {editable && <ActionMenu id={car._id} />}
      <div className="card-image-container">
        <img
          src={car?.images[0]}
          alt="Car"
          className="card-image"
          title={car?.car_name || "car image"}
        />
        <span className="category-badge">{category}</span>
      </div>
      <div className="card-details">
        <h3 className="car-name">{car?.car_name ?? "_"}</h3>
        <p className="car-specs">
          {car?.fuel_type} • {car?.transmission}
        </p>
        <div className="price-section">
          <span className="current-price">₹{car?.price ?? "_"}</span>
        </div>
        <p className="location">📍 {car?.place ?? "_"}</p>
        <div className="visitors">
          <span>
            {car?.views ?? 0} <RemoveRedEyeIcon style={{ fontSize: "15px" }} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
