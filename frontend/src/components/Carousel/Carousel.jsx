import React, { useState, useEffect } from "react";
import "./Carousel.css";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: "Find Your Dream Ride",
      subtitle: "Premium Used Cars, Unbeatable Prices",
      imageUrl: `/images/banner-1.png`,
    },
    // {
    //   title: "Quality You Can Trust",
    //   subtitle: "Every Car Inspected, Every Mile Guaranteed",
    //   imageUrl: `/images/banner-2.png`,
    // },
    // {
    //   title: "Drive Away Happy Today",
    //   subtitle: "Easy Financing, Swift Delivery",
    //   imageUrl: `/images/banner-3.png`,
    // },
    // {
    //   title: "Explore Our Extensive Inventory",
    //   subtitle: "Sedans, SUVs, Trucks & More",
    //   imageUrl: `/images/banner-4.png`,
    // },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel">
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            className="carousel-slide"
            key={index}
            style={{
              backgroundImage: `url(${slide.imageUrl})`,
            }}
          >
            <div className="carousel-content">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
              <button className="carousel-button">Browse Cars</button>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control prev" onClick={goToPrev}>
        &#10094;
      </button>
      <button className="carousel-control next" onClick={goToNext}>
        &#10095;
      </button>
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
