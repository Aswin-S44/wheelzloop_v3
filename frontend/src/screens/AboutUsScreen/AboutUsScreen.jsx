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
  FaArrowRight,
} from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import axios from "axios";
import { STATS_COUNT } from "../../config/api";
import { UserContext } from "../../hooks/UserContext";
import { Box, Modal } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 450,
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)",
  p: 4,
  outline: "none",
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
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [open, setOpen] = useState(false);
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
    <div className="about-page-wrapper screen">
      <section className="story-split-section">
        <div className="container">
          <div className="split-layout">
            <div className="split-content">
              <span className="tagline">Our Mission</span>
              <h2>
                Driven by Passion, <br /> Built for Trust.
              </h2>
              <p>
                Founded in 2025 by a team of automotive enthusiasts, CarAuras
                began with a simple mission: to make buying and selling used
                cars effortless, transparent, and enjoyable.
              </p>
              <p>
                Frustrated by the complexities of traditional car markets, we
                built a platform that connects buyers directly with trusted
                dealers, eliminating middlemen and confusion.
              </p>
              <button className="btn-text-arrow">
                Read full story <FaArrowRight />
              </button>
            </div>
            <div className="split-image">
              <img
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="CarAuras Story"
              />
              <div className="image-accent-box"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="impact-banner">
        <div className="impact-grid">
          <div className="impact-item">
            <FaCar />
            <h3>{data?.cars ?? 150}+</h3>
            <p>Cars Available</p>
          </div>
          <div className="impact-item">
            <FaHandshake />
            <h3>{data?.customers ?? 500}+</h3>
            <p>Transactions</p>
          </div>
          <div className="impact-item">
            <FaShieldAlt />
            <h3>100%</h3>
            <p>Verified Ads</p>
          </div>
          <div className="impact-item">
            <FaChartLine />
            <h3>Top 10</h3>
            <p>Auto Startup</p>
          </div>
        </div>
      </section>

      <section className="workflow-section">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Your journey to a new car in 4 simple steps</p>
          </div>

          <div className="workflow-steps">
            <div className="wf-step">
              <div className="step-num">01</div>
              <h3>Browse</h3>
              <p>Search our extensive inventory of quality used cars.</p>
            </div>
            <div className="wf-connector"></div>
            <div className="wf-step">
              <div className="step-num">02</div>
              <h3>Connect</h3>
              <p>Message dealers instantly to ask questions.</p>
            </div>
            <div className="wf-connector"></div>
            <div className="wf-step">
              <div className="step-num">03</div>
              <h3>Test Drive</h3>
              <p>Schedule a visit to see and drive the car.</p>
            </div>
            <div className="wf-connector"></div>
            <div className="wf-step">
              <div className="step-num">04</div>
              <h3>Own It</h3>
              <p>Complete the purchase and drive away happy.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="cta-overlay"></div>
        <div className="cta-container">
          <h2>Ready to Find Your Perfect Car?</h2>
          <p>
            Join thousands of satisfied customers who found their dream car on
            CarAuras today.
          </p>
          <div className="cta-actions">
            <button
              className="btn-primary-lg"
              onClick={() => (window.location.href = "/cars")}
            >
              Browse Inventory
            </button>
            <button className="btn-outline-lg" onClick={handleSellCar}>
              Sell Your Car
            </button>
          </div>
        </div>
      </section>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <div className="modal-inner">
            <h3 className="modal-title">Account Required</h3>
            <p className="modal-text">
              You need to create an account or sign in to list your vehicle for
              sale.
            </p>
            <div className="modal-actions">
              <button
                className="btn-primary-lg full-width"
                onClick={() => (window.location.href = "/signin")}
              >
                Sign In / Register
              </button>
              <button className="btn-text" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AboutUsScreen;
