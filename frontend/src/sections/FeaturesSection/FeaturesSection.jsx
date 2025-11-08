import React from "react";
import "./FeaturesSection.css";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

function FeaturesSection() {
  return (
    <div className="features-section">
      <div className="section-header">
        <h2>Why Choose Us?</h2>
        <p>Discover the advantages of buying and selling your car with us.</p>
      </div>
      <div className="features-container">
        <div className="feature-card">
          <div className="icon-wrapper">
            <VerifiedUserIcon className="feature-icon" />
          </div>
          <h3>Verified Dealers</h3>
          <p>Trusted and vetted sellers ensure a secure buying experience for you.</p>
        </div>
        <div className="feature-card">
          <div className="icon-wrapper">
            <DriveEtaIcon className="feature-icon" />
          </div>
          <h3>Extensive Car Selection</h3>
          <p>Explore a vast array of vehicles, from sedans to SUVs, all in one place.</p>
        </div>
        <div className="feature-card">
          <div className="icon-wrapper">
            <ChecklistIcon className="feature-icon" />
          </div>
          <h3>Effortless Listing</h3>
          <p>Sell your car with ease using our simple and fast listing process.</p>
        </div>
        <div className="feature-card">
          <div className="icon-wrapper">
            <SupportAgentIcon className="feature-icon" />
          </div>
          <h3>Dedicated Support</h3>
          <p>Our expert team is available 24/7 to assist you with any questions or needs.</p>
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;