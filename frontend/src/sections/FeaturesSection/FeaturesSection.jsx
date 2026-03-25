import React, { useEffect, useRef, useState } from "react";
import "./FeaturesSection.css";
import {
  VerifiedUser,
  Payment,
  LocalShipping,
  SupportAgent,
  Security,
  TrendingUp,
  Speed,
  HeadsetMic,
  EmojiEvents,
  Shield,
  MonetizationOn,
  RocketLaunch,
  WorkspacePremium,
  AutoAwesome,
  Diamond,
} from "@mui/icons-material";

function FeaturesSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      id: 1,
      icon: <VerifiedUser />,
      title: "Verified Dealers",
      description:
        "Every dealer is thoroughly vetted to ensure trust and reliability.",
      stat: "500+",
      statLabel: "Certified Dealers",
      color: "#3b82f6",
      lightColor: "#eff6ff",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      delay: 0,
    },
    {
      id: 2,
      icon: <Diamond />,
      title: "Premium Selection",
      description: "Curated collection of luxury and premium vehicles.",
      stat: "10k+",
      statLabel: "Quality Cars",
      color: "#8b5cf6",
      lightColor: "#f5f3ff",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 0.1,
    },
    {
      id: 3,
      icon: <RocketLaunch />,
      title: "Fast Listing",
      description: "Sell your car in minutes with our streamlined process.",
      stat: "24h",
      statLabel: "Quick Sale",
      color: "#10b981",
      lightColor: "#ecfdf5",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      delay: 0.2,
    },
    {
      id: 4,
      icon: <HeadsetMic />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your queries.",
      stat: "100%",
      statLabel: "Satisfaction",
      color: "#ef4444",
      lightColor: "#fef2f2",
      gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      delay: 0.3,
    },
  ];

  const additionalFeatures = [
    { icon: <Security />, text: "Secure Payments" },
    { icon: <Speed />, text: "Fast Delivery" },
    { icon: <AutoAwesome />, text: "Best Prices" },
    { icon: <EmojiEvents />, text: "Award Winning" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="features-section-modern" ref={sectionRef}>
      <div className="features-pattern"></div>

      <div className="features-header-modern">
        <div className="header-badge-modern">
          <AutoAwesome />
          <span>Why Customers Love Us</span>
        </div>
        <h2 className="features-title-modern">
          More Than Just a{" "}
          <span className="gradient-modern">Car Marketplace</span>
        </h2>
        <p className="features-subtitle-modern">
          We've built a platform that puts you first - whether you're buying or
          selling
        </p>
      </div>

      <div className="features-grid-modern">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`feature-card-modern ${isVisible ? "animate" : ""}`}
            style={{ animationDelay: `${feature.delay}s` }}
          >
            <div
              className="card-decoration"
              style={{ background: feature.lightColor }}
            ></div>

            <div className="card-header-modern">
              <div
                className="icon-wrapper"
                style={{ background: feature.lightColor }}
              >
                <div
                  className="icon-inner"
                  style={{ background: feature.gradient }}
                >
                  {feature.icon}
                </div>
              </div>
              <div
                className="stat-bubble"
                style={{ background: feature.gradient }}
              >
                <span className="stat-bubble-number">{feature.stat}</span>
                <span className="stat-bubble-label">{feature.statLabel}</span>
              </div>
            </div>

            <h3 className="feature-title-modern">{feature.title}</h3>
            <p className="feature-description-modern">{feature.description}</p>

            <div className="feature-link" style={{ color: feature.color }}>
              <span>Discover more</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="features-ticker">
        <div className="ticker-content">
          {additionalFeatures.map((item, idx) => (
            <div key={idx} className="ticker-item">
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
          {additionalFeatures.map((item, idx) => (
            <div key={`dup-${idx}`} className="ticker-item">
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="trust-badge">
        <div className="trust-content">
          <Shield />
          <span>Trusted by over 50,000 happy customers</span>
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
              </svg>
            ))}
          </div>
          <span className="rating-text">4.9/5</span>
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
