import React from "react";
import "./HowItWorks.css";

function HowItWorks() {
  return (
    <div className="how-it-works-section">
      <div className="container-2">
        <h1 className="section-title">How It Works</h1>
        <div className="steps-wrapper">
          <div className="step">
            <div className="step-icon">
              <img
                src="/images/step1.webp"
                alt="Create Account"
                loading="lazy"
              />
            </div>
            <h2 className="step-title">Create an Account</h2>
            <p className="step-description">
              Sign up and join the Wheelzloop community to get started.
            </p>
          </div>
          <div className="step">
            <div className="step-icon">
              <img src="/images/step2.jpeg" alt="Post Car" loading="lazy" />
            </div>
            <h2 className="step-title">Post Your Car</h2>
            <p className="step-description">
              List your car with all the details and reach potential buyers.
            </p>
          </div>
          <div className="step">
            <div className="step-icon">
              <img src="/images/step3.jpeg" alt="Find Buyers" loading="lazy" />
            </div>
            <h2 className="step-title">Find Potential Buyers</h2>
            <p className="step-description">
              Connect with interested buyers and make the deal effortlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
