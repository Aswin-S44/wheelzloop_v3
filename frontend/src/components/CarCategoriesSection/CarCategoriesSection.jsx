import React from "react";
import "./CarCategoriesSection.css";

const categories = [
  { id: 1, title: "Sedan", img: "/images/sedan-removebg-preview.png" },
  { id: 2, title: "SUV", img: "/images/suv.png" },
  { id: 3, title: "Hatchback", img: "/images/hatchback.png" },
  { id: 4, title: "Sports", img: "/images/sports-removebg-preview.png" },
];

function CarCategoriesSection() {
  return (
    <section className="categories-section">
      <div className="section-header">
        <h2 className="section-title">Browse by Body Type</h2>
        <div className="title-underline"></div>
      </div>
      <div className="categories-container">
        {categories.map((cat) => (
          <div className="category-card" key={cat.id}>
            <div className="circle-wrapper">
              <div className="circle">
                <img src={cat.img} alt={cat.title} className="category-image" />
              </div>
            </div>
            <p className="category-label">{cat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CarCategoriesSection;
