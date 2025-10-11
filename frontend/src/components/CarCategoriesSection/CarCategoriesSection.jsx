import React from "react";
import "./CarCategoriesSection.css";

function CarCategoriesSection() {
  return (
    <div className="categories-section">
      <div className="categories-container">
        <div className="category-card">
          <div className="circle">
            <img
              src="/images/sedan-removebg-preview.png"
              alt="Sedan"
              className="category-image"
              title="sedan-car"
            />
          </div>
          <p className="category-title">Sedan</p>
        </div>
        <div className="category-card">
          <div className="circle">
            <img
              src="/images/suv.png"
              alt="SUV"
              className="category-image"
              title="suv-car"
            />
          </div>
          <p className="category-title">SUV</p>
        </div>
        <div className="category-card">
          <div className="circle">
            <img
              src="/images/hatchback.png"
              alt="Hatchback"
              className="category-image"
              title="hatchback-car"
            />
          </div>
          <p className="category-title">Hatchback</p>
        </div>
        <div className="category-card">
          <div className="circle">
            <img
              src="/images/sports-removebg-preview.png"
              alt="Sports"
              className="category-image"
              title="sports-car"
            />
          </div>
          <p className="category-title">Sports</p>
        </div>
      </div>
    </div>
  );
}

export default CarCategoriesSection;
