import React from "react";
import "./FeaturesSection.css";
import {
  VerifiedUser,
  Payment,
  LocalShipping,
  SupportAgent,
} from "@mui/icons-material";

const features = [
  {
    id: 1,
    icon: <VerifiedUser fontSize="inherit" />,
    title: "Verified Dealers",
    desc: "Trusted and verified sellers ensuring a safe and transparent buying experience.",
  },
  {
    id: 2,
    icon: <Payment fontSize="inherit" />,
    title: "Variety of Cars",
    desc: "Browse through diverse car options from trusted sources and private sellers.",
  },
  {
    id: 3,
    icon: <LocalShipping fontSize="inherit" />,
    title: "Easy Listing",
    desc: "Quickly post your car details and connect with potential buyers in minutes.",
  },
  {
    id: 4,
    icon: <SupportAgent fontSize="inherit" />,
    title: "24/7 Support",
    desc: "Round-the-clock dedicated customer support to resolve all your queries.",
  },
];

function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="features-header">
        <h2>Why Choose Us</h2>
        <p>We provide the best experience for buying and selling cars.</p>
      </div>
      <div className="features-grid">
        {features.map((feature) => (
          <div className="feature-card" key={feature.id}>
            <div className="icon-box">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-desc">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
