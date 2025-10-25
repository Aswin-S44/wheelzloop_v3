import React, { useState, useEffect } from "react";
import "./Carousel.css";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: "FIND QUALITY USED CARS IN KERALA, KOCHI",
      subtitle: "USED CARS",
      tagline: "@CarAuras",
      bgColor: "rgb(203 237 211)",
      textColor: "#333",
      image: "/images/wheeelzloop cars1.webp",
    },
    {
      title: "FIND YOUR PERFECT CAR AT CarAuras",
      subtitle: "IN KERALA",
      tagline: "@CarAuras",
      bgColor: "rgb(203 237 211)",
      textColor: "#333",
      image: "/images/wheeelzloop blue-sports-car-isolated-white-vector.webp",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
      <div
        className="slides"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="slide"
            style={{
              backgroundColor: slide.bgColor,
              color: slide.textColor,
            }}
          >
            <div className="banner-content">
              <h2 className="banner-subtitle">{slide.subtitle}</h2>
              <h1 className="banner-title">{slide.title}</h1>
              <p className="banner-tagline">{slide.tagline}</p>
            </div>
            <img
              src={slide.image}
              className="slider-image-sec"
              alt={`banner-${index + 1}`}
              title={`banner-${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
