import React, { useState, useEffect } from "react";
import "./Carousel.css";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Premium Used Cars",
      subtitle: "Kochi, Kerala",
      description: "Discover quality pre-owned vehicles at unbeatable prices.",
      buttonText: "View Inventory",
      image: "/images/wheeelzloop cars1.webp",
      accentColor: "#f39c12",
    },
    {
      id: 2,
      title: "Drive Your Dream",
      subtitle: "Certified Quality",
      description: "Every car passes a 150-point inspection before sale.",
      buttonText: "Book Test Drive",
      image: "/images/wheeelzloop blue-sports-car-isolated-white-vector.webp",
      accentColor: "#3498db",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="carousel-slide">
              <div className="slide-content">
                <span
                  className="slide-subtitle"
                  style={{ color: slide.accentColor }}
                >
                  {slide.subtitle}
                </span>
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-description">{slide.description}</p>
                <button
                  className="slide-btn"
                  style={{ backgroundColor: slide.accentColor }}
                >
                  {slide.buttonText}
                </button>
              </div>
              <div className="slide-image-wrapper">
                <div
                  className="slide-circle-bg"
                  style={{ borderColor: slide.accentColor }}
                ></div>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="slide-image"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator-dot ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
