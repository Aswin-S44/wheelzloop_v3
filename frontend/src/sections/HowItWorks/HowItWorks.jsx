import React from "react";
import { PersonAddAlt1, DirectionsCar, Handshake } from "@mui/icons-material";
import "./HowItWorks.css";

function HowItWorks() {
  return (
    <div className="how-it-works-section">
      <div className="container">
        <div className="section-header">
          <div className="news-header">
            <h2>HOW WHEELZLOOP WORKS</h2>
            <p>Sell your car in just 3 simple steps</p>
          </div>
          {/* <h2 className="section-title">How WheelzLoop Works</h2>
          <p className="section-subtitle">
            Sell your car in just 3 simple steps
          </p> */}
        </div>

        <div className="steps-wrapper">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-icon">
              <PersonAddAlt1 className="icon" />
            </div>
            <h3 className="step-title">Create an Account</h3>
            <p className="step-description">
              Sign up in 30 seconds to join our trusted community of car sellers
              and buyers.
            </p>
          </div>

          <div className="step-connector"></div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-icon">
              <DirectionsCar className="icon" />
            </div>
            <h3 className="step-title">List Your Vehicle</h3>
            <p className="step-description">
              Upload photos and details - we'll help you create the perfect
              listing.
            </p>
          </div>

          <div className="step-connector"></div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-icon">
              <Handshake className="icon" />
            </div>
            <h3 className="step-title">Connect With Buyers</h3>
            <p className="step-description">
              Get offers and negotiate directly with verified buyers in our
              secure platform.
            </p>
          </div>
        </div>

        <button className="cta-button">Get Started Now</button>
      </div>
    </div>
  );
}

export default HowItWorks;
