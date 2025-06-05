import React, { useContext, useEffect, useState } from "react";
import "./AboutUsScreen.css";
import {
  FaCar,
  FaShieldAlt,
  FaHandshake,
  FaChartLine,
  FaSearch,
  FaUserCheck,
  FaTags,
} from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import axios from "axios";
import { STATS_COUNT } from "../../config/api";
import { UserContext } from "../../hooks/UserContext";
import { Box, Modal, Rating, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
  p: 4,
};

const AboutUsScreen = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${STATS_COUNT}`);
        if (res && res.data) {
          setData(res.data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSellCar = () => {
    if (!user) {
      handleOpen();
    } else {
      window.location.href = "/car/add";
    }
  };

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <GiCarWheel className="hero-icon" />
          <h1>Welcome to WheelzLoop</h1>
          <p className="hero-subtitle">
            Your trusted marketplace for quality used cars
          </p>
          <div className="hero-stats">
            <div className="stat-bubble">
              <span>{data?.cars ?? 0}+</span>
              <p>Vehicles</p>
            </div>
            <div className="stat-bubble">
              <span>{data?.customers ?? 0}+</span>
              <p>Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="value-section">
        <div className="section-header">
          <h2>Why Choose WheelzLoop?</h2>
          <p>We're revolutionizing the way people buy and sell used cars</p>
        </div>

        <div className="value-grid">
          <div className="value-card">
            <div className="value-icon">
              <FaSearch />
            </div>
            <h3>Easy Discovery</h3>
            <p>
              Find your perfect car with our advanced search and filtering tools
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <FaUserCheck />
            </div>
            <h3>Verified Dealers</h3>
            <p>Connect directly with trusted dealers in your area</p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <FaTags />
            </div>
            <h3>No Hidden Fees</h3>
            <p>Transparent pricing with no surprise costs</p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <FaShieldAlt />
            </div>
            <h3>Safe Transactions</h3>
            <p>Secure platform for worry-free buying and selling</p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="story-section">
        <div className="story-content">
          <div className="story-text">
            <h2>Our Journey</h2>
            <p>
              Founded in 2020 by a team of automotive enthusiasts, WheelzLoop
              began with a simple mission: to make buying and selling used cars
              effortless, transparent, and enjoyable.
            </p>
            <p>
              Frustrated by the complexities of traditional car markets, we
              built a platform that connects buyers directly with trusted
              dealers, eliminating middlemen and hidden fees.
            </p>
            <p>
              Today, WheelzLoop has grown into a thriving community of car
              lovers, but we've never lost sight of our core values - integrity,
              simplicity, and customer satisfaction.
            </p>
          </div>
          <div className="story-image">
            <div className="image-placeholder">
              <img src="/images/about-wheelzlloop.avif" className="w-100" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <FaCar className="stat-icon" />
            <div className="stat-number">{data?.cars ?? 0}+</div>
            <div className="stat-label">Quality Vehicles</div>
          </div>
          <div className="stat-item">
            <FaHandshake className="stat-icon" />
            <div className="stat-number">{data?.customers ?? 0}+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-item">
            <FaShieldAlt className="stat-icon" />
            <div className="stat-number">100%</div>
            <div className="stat-label">Verified Listings</div>
          </div>
          <div className="stat-item">
            <FaChartLine className="stat-icon" />
            <div className="stat-number">{data?.dealers ?? 0}+</div>
            <div className="stat-label">Trusted Dealers</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="process-section">
        <div className="section-header">
          <h2>How WheelzLoop Works</h2>
          <p>Getting your dream car has never been easier</p>
        </div>

        <div className="process-steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Browse Listings</h3>
            <p>Search our extensive inventory of quality used cars</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Connect Directly</h3>
            <p>Message dealers instantly with your questions</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Test Drive</h3>
            <p>Arrange to see the car in person</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Drive Away Happy</h3>
            <p>Complete your purchase with confidence</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Find Your Perfect Car?</h2>
          <p>
            Join thousands of satisfied customers who found their dream car on
            WheelzLoop
          </p>
          <div className="cta-buttons">
            <button
              className="cta-button primary"
              onClick={() => (window.location.href = "/used-cars")}
            >
              Browse Inventory
            </button>
            <button className="cta-button secondary" onClick={handleSellCar}>
              List Your Vehicle
            </button>
          </div>
        </div>
      </section>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <>
            <div className="auth-required-message">
              <span>You need to create account to add car</span>
              <button
                className="login-redirect-btn"
                onClick={() => (window.location.href = "/signin")}
              >
                Go to login
              </button>
            </div>
          </>
        </Box>
      </Modal>
    </div>
  );
};

export default AboutUsScreen;
