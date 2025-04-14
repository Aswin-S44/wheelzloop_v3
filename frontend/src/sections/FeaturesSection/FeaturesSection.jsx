import React from "react";
import "./FeaturesSection.css";
import {
  VerifiedUser,
  Payment,
  LocalShipping,
  SupportAgent,
} from "@mui/icons-material";

function FeaturesSection() {
  return (
    <div className="features-section">
      <div className="feature-card">
        <div className="feature-icon-container">
          <VerifiedUser className="feature-icon" />
        </div>
        <h3>Verified Dealers</h3>
        <p>Trusted and verified sellers for a safe buying experience.</p>
      </div>
      <div className="feature-card">
        <div className="feature-icon-container">
          <Payment className="feature-icon" />
        </div>
        <h3>Veriety of cars</h3>
        <p>
          You can surf through veriety of cars added by our verified dealers .
        </p>
      </div>
      <div className="feature-card">
        <div className="feature-icon-container">
          <LocalShipping className="feature-icon" />
        </div>
        <h3>Easy to add your car</h3>
        <p>You can easily post your cars and find potential buyers</p>
      </div>
      <div className="feature-card">
        <div className="feature-icon-container">
          <SupportAgent className="feature-icon" />
        </div>
        <h3>24/7 Support</h3>
        <p>Round-the-clock customer support for all your queries.</p>
      </div>
    </div>
  );
}

export default FeaturesSection;
