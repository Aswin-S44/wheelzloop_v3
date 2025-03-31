import React from "react";
import "./Card.css";
import ActionMenu from "../ActionMenu/ActionMenu";

function Card({ car, editable = false }) {
  return (
    <div className="card">
      {editable && (
        <>
          <ActionMenu id={car._id} />
        </>
      )}
      <div className="card-image">
        <img
          src={car?.images[0]}
          alt="Car"
          width="300"
          height="200"
          style={{ width: "100%", height: "auto" }}
        />
        <div className="overlay"></div>
        <span className="price">{car?.price ?? "_"}</span>
        <span className="badge">Featured</span>
      </div>

      <div className="card-content">
        <h3>{car?.car_name ?? "_"}</h3>
        <p className="location">📍 {car?.place ?? "_"}</p>
        <div className="details">
          <span>⛽ {car?.fuel_type ?? "_"}</span>
          <span>⚙️ {car?.transmission ?? "_"}</span>
        </div>
        <div className="visitors">
          <i className="fas fa-eye"></i>
          <span>{car?.views ?? 0} Visitors</span>
        </div>
        {/* <button className="contact-btn">Contact Seller</button> */}
      </div>
    </div>
  );
}

export default Card;
