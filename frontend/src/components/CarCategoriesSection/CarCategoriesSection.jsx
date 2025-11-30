import React from "react";
import "./CarCategoriesSection.css";

const categories = [
  {
    id: 1,
    title: "Sedan",
    image: "/images/sedan-removebg-preview.png",
    alt: "Sedan Car",
    bgColor: "#e3f2fd",
  },
  {
    id: 2,
    title: "SUV",
    image: "/images/suv.png",
    alt: "SUV Car",
    bgColor: "#e8f5e9",
  },
  {
    id: 3,
    title: "Hatchback",
    image: "/images/hatchback.png",
    alt: "Hatchback Car",
    bgColor: "#fff3e0",
  },
  {
    id: 4,
    title: "Sports",
    image: "/images/sports-removebg-preview.png",
    alt: "Sports Car",
    bgColor: "#ffebee",
  },
];

function CarCategoriesSection() {
  return (
    <section className="categories-section">
      <div className="categories-wrapper">
        {categories.map((category) => (
          <div
            className="category-card"
            key={category.id}
            style={{ backgroundColor: category.bgColor }}
          >
            <div className="image-container">
              <img
                src={category.image}
                alt={category.alt}
                className="category-image"
              />
            </div>
            <div className="card-content">
              <h3 className="category-name">{category.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CarCategoriesSection;
