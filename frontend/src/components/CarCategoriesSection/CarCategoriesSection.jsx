import React from "react";
import "./CarCategoriesSection.css";

function CarCategoriesSection() {
  return (
    <div className="categories-section">
      <div className="categories-container">
        <div className="category-card">
          <div className="circle">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0QkWLR_bCAFBLCfF0qRyJzFbf_w3MBrZnlA&s"
              alt="Sedan"
              className="category-image"
            />
          </div>
          <h3 className="category-title">Sedan</h3>
        </div>
        <div className="category-card">
          <div className="circle">
            <img
              src="https://www.freeiconspng.com/thumbs/car-png/land-rover-range-rover-car-png-25.png"
              alt="SUV"
              className="category-image"
            />
          </div>
          <h3 className="category-title">SUV</h3>
        </div>
        <div className="category-card">
          <div className="circle">
            <img
              src="https://www.freeiconspng.com/uploads/yellow-car-png-26.png"
              alt="Hatchback"
              className="category-image"
            />
          </div>
          <h3 className="category-title">Hatchback</h3>
        </div>
        <div className="category-card">
          <div className="circle">
            <img
              src="https://pngdownload.io/wp-content/uploads/2024/06/Nissan-Altima-Stylish-Sedan-768x427.jpg"
              alt="Sports"
              className="category-image"
            />
          </div>
          <h3 className="category-title">Sports</h3>
        </div>
      </div>
    </div>
  );
}

export default CarCategoriesSection;
