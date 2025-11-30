import React, { useState, useEffect } from "react";
import "./Banner2.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Banner2() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      bgColor: "#809d99",
      title: "The Best Used Cars Collection in Kochi, Kerala",
      subtitle: (
        <>
          Discover our wide range of{" "}
          <span className="quality-text">
            Quality
            <svg
              width="120"
              height="12"
              viewBox="0 0 120 12"
              className="curved-line"
            >
              <path
                d="M0,6 Q60,12 120,6"
                stroke="#FFD700"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </span>{" "}
          used cars collections.
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1605559424843-9e4c2287f38d?q=80&w=1000&auto=format&fit=crop",
      imageAlt: "Luxury SUV",
    },
    {
      id: 2,
      bgColor: "#2c3e50",
      title: "Premium Certified Vehicles For Every Journey",
      subtitle: (
        <>
          Experience the thrill of{" "}
          <span className="quality-text">
            Performance
            <svg
              width="140"
              height="12"
              viewBox="0 0 140 12"
              className="curved-line"
            >
              <path
                d="M0,6 Q70,12 140,6"
                stroke="#FFD700"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </span>{" "}
          at unbeatable prices.
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1000&auto=format&fit=crop",
      imageAlt: "Sports Sedan",
    },
    {
      id: 3,
      bgColor: "#5d4037",
      title: "Affordable Family Cars Verified by Experts",
      subtitle: (
        <>
          Drive home with{" "}
          <span className="quality-text">
            Confidence
            <svg
              width="130"
              height="12"
              viewBox="0 0 130 12"
              className="curved-line"
            >
              <path
                d="M0,6 Q65,12 130,6"
                stroke="#FFD700"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </span>{" "}
          and complete peace of mind.
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop",
      imageAlt: "Family Car",
    },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div
      className="banner-container mt-2"
      style={{ backgroundColor: slides[currentSlide].bgColor }}
    >
      <div className="carousel-content">
        <div className="row align-items-center h-100">
          <div className="col-md-6 order-md-1 order-2 p-md-5 p-4 text-section">
            <div className="slide-text-animation" key={currentSlide}>
              <h1
                className="display-4 fw-bold mb-3 banner-title"
                style={{ color: "rgb(255 255 255)" }}
              >
                {slides[currentSlide].title}
              </h1>
              <h2 className="fs-5 mb-4 banner-subtitle-2">
                {slides[currentSlide].subtitle}
              </h2>
              <button
                className="btn btn-dark px-4 py-3 banner-button"
                onClick={() => (window.location.href = "/used-cars")}
              >
                Explore Now <ArrowRightAltIcon />
              </button>
            </div>
          </div>

          <div className="col-md-6 order-md-2 order-1 p-0 image-section">
            <div className="image-wrapper">
              <img
                src={slides[currentSlide].image}
                className="w-100 banner-image"
                alt={slides[currentSlide].imageAlt}
                key={currentSlide}
              />
            </div>
          </div>
        </div>

        <button className="nav-btn prev-btn" onClick={prevSlide}>
          <ArrowBackIosNewIcon />
        </button>
        <button className="nav-btn next-btn" onClick={nextSlide}>
          <ArrowForwardIosIcon />
        </button>

        <div className="carousel-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banner2;
