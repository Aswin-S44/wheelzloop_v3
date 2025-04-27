import React from "react";
import "./Card.css";
import ActionMenu from "../ActionMenu/ActionMenu";

function Card({ car, editable = false, category }) {
  return (
    <div className="card">
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
          <span>{car?.views ?? 0} Visitors</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
