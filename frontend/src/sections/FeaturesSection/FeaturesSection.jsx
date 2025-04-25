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
      <div className="features-container">
        <div className="feature-card">
          <VerifiedUser className="feature-icon" />
          <h3>Verified Dealers</h3>
          <p>Trusted and verified sellers for a safe buying experience.</p>
        </div>
        <div className="feature-card">
          <Payment className="feature-icon" />
          <h3>Variety of Cars</h3>
          <p>Browse through diverse car options from our verified dealers.</p>
        </div>
        <div className="feature-card">
          <LocalShipping className="feature-icon" />
          <h3>Easy Listing</h3>
          <p>Quickly post your cars and connect with potential buyers.</p>
        </div>
        <div className="feature-card">
          <SupportAgent className="feature-icon" />
          <h3>24/7 Support</h3>
          <p>Round-the-clock customer support for all your queries.</p>
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
