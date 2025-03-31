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
        <h3>Secure Payments</h3>
        <p>100% secure payment options for hassle-free transactions.</p>
      </div>
      <div className="feature-card">
        <div className="feature-icon-container">
          <LocalShipping className="feature-icon" />
        </div>
        <h3>Fast Delivery</h3>
        <p>Quick and reliable delivery services across the country.</p>
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
