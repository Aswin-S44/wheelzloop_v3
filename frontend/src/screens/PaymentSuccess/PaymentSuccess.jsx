import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/profile"), 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div id="payment-success-container">
      <div id="payment-success-card">
        <div id="payment-success-icon">
          <CheckCircleOutlineIcon style={{ fontSize: "4rem" }} />
        </div>

        <h1>Payment Successful!</h1>
        <p>
          Thank you for your purchase. Your transaction has been completed
          successfully.
        </p>

        <div id="invoice-alert">
          <p>An invoice has been sent to your email.</p>
        </div>

        <button onClick={() => navigate("/")}>Back to Home</button>

        <small>You will be redirected automatically in 5 seconds...</small>
      </div>
    </div>
  );
};

export default PaymentSuccess;
