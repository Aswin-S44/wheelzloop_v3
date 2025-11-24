import React, { useState, useEffect } from "react";
import "./Carousel.css";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: "FIND QUALITY USED CARS IN KERALA, KOCHI",
      subtitle: "USED CARS",
      tagline: "@CarAuras",
      bgColor: "#809d99",
      textColor: "#fff",
      image: "/images/wheeelzloop cars1.webp",
    },
    {
      title: "FIND YOUR PERFECT CAR AT CARAURAS",
      subtitle: "IN KERALA",
      tagline: "@CarAuras",
      bgColor: "#809d99",
      textColor: "#fff",
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
    <div className="carousel-container">
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
                <h1 className="banner-title" style={{ color: "#fff" }}>
                  {slide.title}
                </h1>
                <p className="banner-subtitle">{slide.subtitle}</p>
                <p className="banner-tagline">{slide.tagline}</p>
              </div>
              <img
                src={slide.image}
                className="slider-image"
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
    </div>
  );
}

export default Carousel;
