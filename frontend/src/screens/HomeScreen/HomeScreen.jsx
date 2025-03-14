import React, { useRef } from "react";
import "./HomeScreen.css";
import TitleHeader from "../../components/TitleHeader/TitleHeader";
import Card from "../../components/Card/Card";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import HowItWorks from "../../sections/HowItWorks/HowItWorks";
import NewsAndResources from "../../sections/NewsAndResources/NewsAndResources";
import FAQSection from "../../sections/FAQ/FAQ";
import Counter from "../../components/Counter/Counter";
import FeaturesSection from "../../sections/FeaturesSection/FeaturesSection";

function HomeScreen() {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="screens">
      <div className="container">
        <FeaturesSection />
        <div className="mt-4">
          <TitleHeader title1={"Latest"} title2={"Cars"} option={"View all"} />
          <div className="slider-container">
            <IconButton
              className="arrow-button left"
              onClick={scrollLeft}
              aria-label="left-scroll-btn"
            >
              <ChevronLeft />
            </IconButton>
            <div className="card-slider" ref={sliderRef}>
              <div className="card-container">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
              </div>
            </div>
            <IconButton
              className="arrow-button right"
              onClick={scrollRight}
              aria-label="right-scroll-btn"
            >
              <ChevronRight />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <HowItWorks />
        <div className="mt-4">
          <NewsAndResources />
        </div>
        <div className="mt-4">
          <Counter />
        </div>
        <div className="mt-5">
          <FAQSection />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
