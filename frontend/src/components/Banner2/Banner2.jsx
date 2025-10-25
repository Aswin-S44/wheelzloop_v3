import React from "react";
import "./Banner2.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

function Banner2() {
  return (
    <div className="dynamic-banner-container mt-4">
      <div className="dynamic-banner-content">
        <div className="dynamic-banner-text p-md-5 p-4">
          <h1 className="display-3 fw-bold mb-3 dynamic-banner-title">
            Drive Your Dream: Discover Premium Used Cars
          </h1>
          <h2 className="fs-5 mb-4 dynamic-banner-subtitle">
            Unveiling Kochi's finest collection of{" "}
            <span className="dynamic-highlight-text">
              Certified Quality
              <svg
                width="200"
                height="20"
                viewBox="0 0 200 20"
                className="dynamic-underline-svg"
              >
                <path
                  d="M0,10 Q100,20 200,10"
                  stroke="#FFC107"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </span>{" "}
            vehicles, ready for the road.
          </h2>
          <button
            className="btn dynamic-explore-button px-5 py-3"
            onClick={() => (window.location.href = "/used-cars")}
          >
            Explore Inventory <ArrowRightAltIcon className="ms-2" />
          </button>
        </div>
        <div className="dynamic-banner-image-wrapper p-0">
          <img
            src="/images/wheelzloop-main-img.webp"
            srcSet="
              /images/wheelzloop-main-img-480.webp 480w,
              /images/wheelzloop-main-img-768.webp 768w,
              /images/wheelzloop-main-img.webp 1200w
            "
            sizes="(max-width: 768px) 100vw, 1200px"
            width="1200"
            height="600"
            className="dynamic-banner-main-image"
            alt="Sleek Modern Car"
            title="Wheelzloop main banner image"
          />
          <div className="dynamic-image-overlay"></div>
        </div>
      </div>
    </div>
  );
}

export default Banner2;
