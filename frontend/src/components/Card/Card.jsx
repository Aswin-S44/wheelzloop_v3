import React from "react";
import "./Card.css";

function Card() {
  return (
    <div className="card">
      <div className="card-image">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOC3dVkhJ8KtrDSUblhHcz8uHWEhmm5iK67w&s"
          alt="Car"
          width="300"
          height="200"
          style={{ width: "100%", height: "auto" }}
        />
        <div className="overlay"></div>
        <span className="price">$12,000</span>
        <span className="badge">Featured</span>
      </div>
      <div className="card-content">
        <h3>Used Car Name</h3>
        <p className="location">📍 New York, USA</p>
        <div className="details">
          <span>⛽ Petrol</span>
          <span>⚙️ Automatic</span>
        </div>
        <div className="visitors">
          <i className="fas fa-eye"></i>
          <span>1.2k Visitors</span>
        </div>
        {/* <button className="contact-btn">Contact Seller</button> */}
      </div>
    </div>
  );
}

export default Card;
