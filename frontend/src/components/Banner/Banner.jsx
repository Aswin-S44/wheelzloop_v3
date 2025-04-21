import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Banner.css";

function Banner() {
  const navigate = useNavigate();

  return (
    <div className="banner-wrapper">
      <div className="banner-overlay"></div>
      <div className="banner-container">
        <div className="banner-content">
          <h1>
            Quality Used Cars <span>Near You</span>
          </h1>
          <p>Trusted by 10,000+ customers • 5,000+ verified vehicles</p>
          <div className="banner-buttons">
            <Button
              variant="contained"
              className="primary-btn"
              onClick={() => navigate("/used-cars")}
            >
              Explore Inventory
            </Button>
          </div>
          <div className="banner-features">
            <div className="feature-item">
              <i className="fas fa-shield-alt"></i>
              <span style={{ color: "#00796b" }}>1-Year Warranty</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-car"></i>
              <span style={{ color: "#00796b" }}>200+ Point Check</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-hand-holding-usd"></i>
              <span style={{ color: "#00796b" }}>Best Price Guarantee</span>
            </div>
          </div>
        </div>
        <div className="banner-image">
          <img
            src="/images/banner.jpg"
            alt="Happy family at car dealership"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
