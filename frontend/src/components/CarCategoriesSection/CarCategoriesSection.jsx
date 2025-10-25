import React from "react";
import "./CarCategoriesSection.css";

function CarCategoriesSection() {
  const categories = [
    { name: "Sedan", image: "/images/sedan-removebg-preview.png" },
    { name: "SUV", image: "/images/suv.png" },
    { name: "Hatchback", image: "/images/hatchback.png" },
    { name: "Sports", image: "/images/sports-removebg-preview.png" },
  ];

  return (
    <div className="categories-section">
      <div className="categories-container">
        {categories.map((category) => (
          <div className="category-card" key={category.name}>
            <div className="image-wrapper">
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
                title={`${category.name}-car`}
              />
            </div>
            <p className="category-title">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarCategoriesSection;
