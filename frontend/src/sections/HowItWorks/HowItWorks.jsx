import React, { useContext, useEffect, useState } from "react";
import {
  AccountCircleOutlined,
  DirectionsCarOutlined,
  HandshakeOutlined,
  PersonAddAlt1,
  RecentActors,
  WatchLater,
} from "@mui/icons-material";
import "./HowItWorks.css";
import { UserContext } from "../../hooks/UserContext";

function HowItWorks() {
  const { user } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    }
  }, [user]);

  const handleClick = () => {
    if (loggedIn) {
      window.location.href = "/profile";
    } else {
      window.location.href = "/signin";
    }
  };

  return (
    <div className="how-it-works-section" id="Works">
      <div className="how-it-works-container">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Selling your car is simple with our easy 3-step process.</p>
        </div>

        <div className="steps-wrapper">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-icon">
              <AccountCircleOutlined />
            </div>
            <h3 className="step-title">Create Your Account</h3>
            <p className="step-description">
              Sign up in seconds to join our community of car enthusiasts and
              sellers.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-icon">
              <DirectionsCarOutlined />
            </div>
            <h3 className="step-title">List Your Vehicle</h3>
            <p className="step-description">
              Upload details and photos to create an attractive listing for your
              car.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-icon">
              <HandshakeOutlined />
            </div>
            <h3 className="step-title">Connect with Buyers</h3>
            <p className="step-description">
              Receive offers and finalize deals directly on our secure platform.
            </p>
          </div>
        </div>

        <button
          className="cta-button"
          data-bs-toggle="modal"
          data-bs-target="#howToSellModal"
        >
          {loggedIn ? "Go to Profile" : "Get Started Now"}
        </button>
      </div>

      <div
        className="modal fade"
        id="howToSellModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="howToSellModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered car-selling-steps-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="howToSellModalLabel">
                How to Sell Your Car
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="car-steps-container">
                <div className="car-step-item">
                  <div className="car-step-icon">
                    <PersonAddAlt1 />
                  </div>
                  <div className="car-step-details">
                    <h3>Create Your Account</h3>
                    <p>
                      Sign up using your email or social media accounts to get
                      started.
                    </p>
                  </div>
                </div>
                <div className="car-step-item">
                  <div className="car-step-icon">
                    <RecentActors />
                  </div>
                  <div className="car-step-details">
                    <h3>Complete Your Profile</h3>
                    <p>
                      Fill in your details and verify your identity for trust
                      and security.
                    </p>
                  </div>
                </div>
                <div className="car-step-item">
                  <div className="car-step-icon">
                    <DirectionsCarOutlined />
                  </div>
                  <div className="car-step-details">
                    <h3>Add Your Car Details</h3>
                    <p>
                      Enter your car's specifications, upload photos, and set
                      your price.
                    </p>
                  </div>
                </div>
                <div className="car-step-item">
                  <div className="car-step-icon">
                    <WatchLater />
                  </div>
                  <div className="car-step-details">
                    <h3>Publish & Wait for Offers</h3>
                    <p>
                      Review and publish your listing. Interested buyers will
                      contact you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
