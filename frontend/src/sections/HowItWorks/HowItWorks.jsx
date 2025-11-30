import React, { useContext, useEffect, useState } from "react";
import "./HowItWorks.css";
import { UserContext } from "../../hooks/UserContext";
import {
  PersonAddOutlined,
  DirectionsCarFilledOutlined,
  HandshakeOutlined,
  ArrowForward,
  CheckCircle,
} from "@mui/icons-material";

function HowItWorks() {
  const { user } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    }
  }, [user]);

  const handleClick = async () => {
    if (loggedIn) {
      window.location.href = "/profile";
    } else {
      window.location.href = "/signin";
    }
  };

  return (
    <section className="hiw-modern-section" id="Works">
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      <div className="hiw-content-wrapper">
        <div className="hiw-header-modern">
          <span className="pill-badge">Simple Process</span>
          <h2 className="hiw-title-modern">
            From Driveway to <span className="text-gradient">Sold</span>
          </h2>
          <p className="hiw-desc-modern">
            We've streamlined the car selling process into three powerful steps.
          </p>
        </div>

        <div className="cards-perspective-container">
          <div className="glass-step-card step-1">
            <div className="step-bg-number">01</div>
            <div className="card-icon-wrapper color-1">
              <PersonAddOutlined className="step-icon-m" />
            </div>
            <div className="card-text-content">
              <h3>Create Account</h3>
              <p>
                Join the elite marketplace. Verify your identity in seconds to
                unlock full access.
              </p>
            </div>
            <div className="card-shine"></div>
          </div>

          <div className="arrow-connector">
            <ArrowForward />
          </div>

          <div className="glass-step-card step-2">
            <div className="step-bg-number">02</div>
            <div className="card-icon-wrapper color-2">
              <DirectionsCarFilledOutlined className="step-icon-m" />
            </div>
            <div className="card-text-content">
              <h3>List Your Car</h3>
              <p>
                AI-powered listing tool. Upload photos and let us generate the
                perfect description.
              </p>
            </div>
            <div className="card-shine"></div>
          </div>

          <div className="arrow-connector">
            <ArrowForward />
          </div>

          <div className="glass-step-card step-3">
            <div className="step-bg-number">03</div>
            <div className="card-icon-wrapper color-3">
              <HandshakeOutlined className="step-icon-m" />
            </div>
            <div className="card-text-content">
              <h3>Get Paid</h3>
              <p>
                Connect with verified buyers, negotiate securely, and close the
                deal instantly.
              </p>
            </div>
            <div className="card-shine"></div>
          </div>
        </div>

        {!loggedIn && (
          <div className="action-area">
            <button
              className="pulse-btn"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Start Selling Now
            </button>
          </div>
        )}
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content glass-modal">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-0">
              <div className="modal-modern-layout">
                <div className="modal-visual-side">
                  <div className="visual-overlay">
                    <h3>Ready to Sell?</h3>
                    <p>Join 50,000+ happy sellers</p>
                  </div>
                  <img
                    src="/images/login.png"
                    alt=""
                    className="modal-bg-img"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
                <div className="modal-action-side">
                  <h2>Let's Get Started</h2>
                  <div className="checklist-modern">
                    <div className="check-row">
                      <CheckCircle className="check-icon-m" />
                      <span>Free Listing</span>
                    </div>
                    <div className="check-row">
                      <CheckCircle className="check-icon-m" />
                      <span>Instant Offers</span>
                    </div>
                    <div className="check-row">
                      <CheckCircle className="check-icon-m" />
                      <span>Secure Payment</span>
                    </div>
                  </div>
                  <button className="modal-main-btn" onClick={handleClick}>
                    Create My Listing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
