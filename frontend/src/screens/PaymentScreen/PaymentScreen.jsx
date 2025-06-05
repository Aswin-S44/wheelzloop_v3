import React, { useState } from "react";
import { FaLock, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { SiPhonepe, SiPaytm, SiGooglepay } from "react-icons/si";
import { RiVisaFill, RiMastercardFill } from "react-icons/ri";
import { useParams, useNavigate } from "react-router-dom";
import "./PaymentScreen.css";

const PaymentScreen = () => {
  const { plan } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");

  const planDetails = {
    pro: {
      name: "Pro Plan",
      price: plan === "yearly" ? "₹5,388 (₹449/month)" : "₹599/month",
      features: [
        "Up to 25-50 listings",
        "Featured profile badge",
        "WhatsApp contact button",
        "Basic performance analytics",
        "Boost 2 listings/month",
      ],
    },
    elite: {
      name: "Elite Plan",
      price: plan === "yearly" ? "₹17,988 (₹1,499/month)" : "₹2,499/month",
      features: [
        "Unlimited listings",
        "Priority placement",
        "Custom dealer landing page",
        "Advanced analytics",
        "Boost up to 10 listings/month",
      ],
    },
  };

  const handlePayment = (e) => {
    e.preventDefault();

    // Payment logic
  };

  return (
    <div className="subscribe-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back to Plans
      </button>

      <div className="subscribe-header">
        <h1>Complete Your Subscription</h1>
        <p>Secure payment processed with 256-bit encryption</p>
      </div>

      <div className="payment-grid">
        <div className="plan-summary">
          <div className="summary-header">
            <h2>{planDetails[plan].name}</h2>
            <p className="price">{planDetails[plan].price}</p>
          </div>

          <ul className="features-list">
            {planDetails[plan].features.map((feature, index) => (
              <li key={index}>
                <FaCheckCircle className="check-icon" /> {feature}
              </li>
            ))}
          </ul>

          <div className="security-badge">
            <FaLock className="lock-icon" />
            <span>Your payment is secure and encrypted</span>
          </div>
        </div>

        <div className="payment-form-container">
          <form className="payment-form" onSubmit={handlePayment}>
            <div className="payment-methods">
              <h3>Select Payment Method</h3>
              <div className="method-options">
                <div
                  className={`method-option ${
                    paymentMethod === "card" ? "active" : ""
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <div className="card-icons">
                    <RiVisaFill className="visa-icon" />
                    <RiMastercardFill className="mastercard-icon" />
                  </div>
                  <span>Credit/Debit Card</span>
                </div>

                <div
                  className={`method-option ${
                    paymentMethod === "upi" ? "active" : ""
                  }`}
                  onClick={() => setPaymentMethod("upi")}
                >
                  <div className="upi-icons">
                    <SiPhonepe className="phonepe-icon" />
                    <SiPaytm className="paytm-icon" />
                    <SiGooglepay className="gpay-icon" />
                  </div>
                  <span>UPI Payment</span>
                </div>
              </div>
            </div>

            {paymentMethod === "card" && (
              <div className="card-form">
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        number: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="Name on card"
                    value={cardDetails.name}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          expiry: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          cvv: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "upi" && (
              <div className="upi-form">
                <div className="form-group">
                  <label>UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>

                <div className="upi-apps">
                  <button type="button" className="upi-app">
                    <SiPhonepe className="upi-icon" />
                    PhonePe
                  </button>
                  <button type="button" className="upi-app">
                    <SiPaytm className="upi-icon" />
                    Paytm
                  </button>
                  <button type="button" className="upi-app">
                    <SiGooglepay className="upi-icon" />
                    Google Pay
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="pay-button"
              disabled={!paymentMethod}
            >
              Pay {planDetails[plan].price.split(" ")[0]}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
