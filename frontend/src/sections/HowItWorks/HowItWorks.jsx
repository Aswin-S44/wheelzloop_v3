import React, { useContext, useEffect, useState } from "react";
import { PersonAddAlt1, DirectionsCar, Handshake } from "@mui/icons-material";
import "./HowItWorks.css";
import { UserContext } from "../../hooks/UserContext";
import SpringModal from "../../components/SpringModal/SpringModal";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

function HowItWorks() {
  const { user } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

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

  const handleOpen = (car) => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div className="how-it-works-section" id="Works">
      <div className="container">
        <h3 className="text-center fw-bold">
          <span className="quality-text">
            HOW WHEELZLOOP WORKS
            <svg
              width="120"
              height="12"
              viewBox="0 0 120 12"
              className="curved-line"
            >
              <path
                d="M0,6 Q60,12 120,6"
                stroke="#FFD700"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </span>{" "}
        </h3>
        <div className="section-header mt-4">
          <div className="news-header">
            <p>Sell your car in just 3 simple steps</p>
          </div>
        </div>

        <div className="steps-wrapper">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-icon">
              <PersonAddAlt1 className="icon" style={{ color: "#ADB2D4" }} />
            </div>
            <h3 className="step-title">Create an Account</h3>
            <p className="step-description">
              Sign up in 30 seconds to join our trusted community of car sellers
              and buyers.
            </p>
          </div>

          <div className="step-connector"></div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-icon">
              <DirectionsCar className="icon" style={{ color: "#ADB2D4" }} />
            </div>
            <h3 className="step-title">List Your Vehicle</h3>
            <p className="step-description">
              Upload photos and details - we'll help you create the perfect
              listing.
            </p>
          </div>

          <div className="step-connector"></div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-icon">
              <Handshake className="icon" style={{ color: "#ADB2D4" }} />
            </div>
            <h3 className="step-title">Connect With Buyers</h3>
            <p className="step-description">
              Get offers and negotiate directly with verified buyers in our
              secure platform.
            </p>
          </div>
        </div>
        {!loggedIn && (
          <a href="/signin">
            <button
              className="cta-button d-block mx-auto"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{
                background: "#606cbc",
                padding: "15px 40px",
                color: "#fff",
                border: "none",
                borderRadius: "50px",
              }}
            >
              Get Started Now
            </button>
          </a>
        )}
      </div>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered car-selling-steps-modal">
          <div class="modal-content">
            <div class="modal-header car-steps-header">
              <h2 class="modal-title car-steps-title">How to Sell Your Car</h2>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body car-steps-body">
              <div class="car-steps-container">
                <div class="car-step-item">
                  <div class="car-step-icon">
                    <span class="material-icons">
                      <PersonAddIcon />
                    </span>
                  </div>
                  <div class="car-step-details">
                    <h3>Create Your Account</h3>
                    <p>
                      Sign up using your email or social media accounts to get
                      started.
                    </p>
                  </div>
                </div>
                <div class="car-step-item">
                  <div class="car-step-icon">
                    <span class="material-icons">
                      <RecentActorsIcon />
                    </span>
                  </div>
                  <div class="car-step-details">
                    <h3>Complete Your Profile</h3>
                    <p>
                      Fill in your details and verify your identity for trust
                      and security.
                    </p>
                  </div>
                </div>
                <div class="car-step-item">
                  <div class="car-step-icon">
                    <span class="material-icons">
                      <DirectionsCarIcon />
                    </span>
                  </div>
                  <div class="car-step-details">
                    <h3>Add Your Car Details</h3>
                    <p>
                      Enter your car's specifications, upload photos, and set
                      your price.
                    </p>
                  </div>
                </div>
                <div class="car-step-item">
                  <div class="car-step-icon">
                    <span class="material-icons">
                      <WatchLaterIcon />
                    </span>
                  </div>
                  <div class="car-step-details">
                    <h3>Publish & Wait for Offers</h3>
                    <p>
                      Review and publish your listing. Interested buyers will
                      contact you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer car-steps-footer">
              <button
                type="button"
                class="btn btn-outline-secondary car-steps-close-btn"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn car-steps-primary-btn"
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
