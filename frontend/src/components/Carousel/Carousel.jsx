import React, { useState, useEffect } from "react";
import "./Carousel.css";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: "FIND QUALITY USED CARS IN KERALA, KOCHI",
      subtitle: "USED CARS",
      tagline: "@WHEELZLOOP",
      bgColor: "rgb(203 237 211)",
      textColor: "#1111",
      image: "/images/hatchback.webp",
    },
    {
      title: "FIND YOUR PERFECT CAR AT WHEELZLOOP",
      subtitle: "IN KERALA",
      tagline: "@WHEELZLOOP",
      bgColor: "rgb(203 237 211)",
      textColor: "#1111",
      image: "/images/suv.webp",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
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
              <h1 className="banner-title">{slide.title}</h1>
              <h2 className="banner-subtitle">{slide.subtitle}</h2>
              <p className="banner-tagline">{slide.tagline}</p>
            </div>
            <img src={slide.image} className="w-50" />
          </div>
        ))}
      </div>
      <div className="dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
