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
      image: "/images/wheeelzloop cars1.webp",
    },
    {
      title: "FIND YOUR PERFECT CAR AT WHEELZLOOP",
      subtitle: "IN KERALA",
      tagline: "@WHEELZLOOP",
      bgColor: "rgb(203 237 211)",
      textColor: "#1111",
      image: "/images/wheeelzloop blue-sports-car-isolated-white-vector.webp",
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
        {/* {slides.map((slide, index) => (
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
              <p className="banner-subtitle">{slide.subtitle}</p>
              <p className="banner-tagline">{slide.tagline}</p>
            </div>
            <img src={slide.image} className="w-50" />
          </div>
        ))} */}

        <div
          key={1}
          className="slide"
          style={{
            backgroundColor: slides[0].bgColor,
            color: slides[0].textColor,
          }}
        >
          <div className="banner-content">
            <h1 className="banner-title">{slides[0].title}</h1>
            <p className="banner-subtitle">{slides[0].subtitle}</p>
            <p className="banner-tagline">{slides[0].tagline}</p>
          </div>
          <img src={slides[0].image} className="w-50 slider-image-sec" alt="banner-1" title="banner-1" />
        </div>
        <div
          key={2}
          className="slide"
          style={{
            backgroundColor: slides[1].bgColor,
            color: slides[1].textColor,
          }}
        >
          <div className="banner-content">
            <h2 className="banner-title">{slides[1].title}</h2>
            <p className="banner-subtitle">{slides[1].subtitle}</p>
            <p className="banner-tagline">{slides[1].tagline}</p>
          </div>
          <img src={slides[1].image} className="w-50 slider-image-sec" alt="banner-2" title="banner-2" />
        </div>
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
