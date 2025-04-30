import React from "react";
import "./Banner2.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

function Banner2() {
  return (
    <div className="banner-container mt-2">
      <div className="row align-items-center">
        <div className="col-md-6 order-md-1 order-2 p-md-5 p-4">
          <h1 className="display-4 fw-bold mb-3 banner-title">
            The Best used Cars Collection in Kochi, Kerala
          </h1>
          <h2
            className="fs-5 mb-4 banner-subtitle"
            style={{ fontSize: "40px", fontWeight: 400 }}
          >
            Discover our wide range of{" "}
            <span className="quality-text">
              Quality
              <svg
                width="120"
                height="12"
                viewBox="0 0 120 12"
                className="curved-line"
              >
                <path
                  d="M0,6 Q60,12 120,6"
                  stroke="#FFD700"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </span>{" "}
            used cars collections.
          </h2>
          <button
            className="btn btn-dark px-4 py-3 banner-button"
            onClick={() => (window.location.href = "/used-cars")}
          >
            Explore Now <ArrowRightAltIcon />
          </button>
        </div>
        <div className="col-md-6 order-md-2 order-1 p-0">
          <img
            src="/images/wheelzloop-main-img.webp"
            className="w-100 banner-image"
            alt="Luxury Car"
            title="Wheelzloop banner image"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner2;
