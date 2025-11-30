import React, { useState } from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { ADD_SUBSCRIPTION_URL } from "../../config/api";
import Swal from "sweetalert2";

function Footer() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      const res = await axios.post(ADD_SUBSCRIPTION_URL, { email });
      setLoading(false);

      if (res && res.status === 200) {
        Swal.fire({
          title: "Subscribed!",
          text: "Welcome to the Carauras community.",
          icon: "success",
          confirmButtonColor: "#1D6170",
        });
        setEmail("");
      } else {
        Swal.fire({
          title: "Already Subscribed",
          text: "You are already on our list!",
          icon: "info",
          confirmButtonColor: "#1D6170",
        });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setLoading(false);
      Swal.fire({
        title: "Already Subscribed",
        icon: "info",
        confirmButtonColor: "#1D6170",
      });
      setEmail("");
    }
  };

  return (
    <footer className="footer-modern">
      <div className="footer-glow"></div>

      <div className="footer-container">
        <div className="footer-top">
          <div className="brand-section">
            <h2 className="footer-logo-text">CarAuras</h2>
            <p className="brand-desc">
              Your trusted partner for buying and selling premium used cars.
              Experience transparency and speed like never before.
            </p>
            <div className="social-links">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon fb"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon insta"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon yt"
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>

          <div className="links-grid">
            <div className="link-column">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/about-us">About Us</a>
                </li>
                <li>
                  <a href="/contact-us">Contact</a>
                </li>
                <li>
                  <a href="/signin">Get Started</a>
                </li>
              </ul>
            </div>

            <div className="link-column">
              <h4>Services</h4>
              <ul>
                <li>
                  <a href="/used-cars">Buy Cars</a>
                </li>
                <li>
                  <a href="/signin">Sell Car</a>
                </li>
                <li>
                  <a href="/reviews">Reviews</a>
                </li>
                <li>
                  <a href="/blogs">Auto Blog</a>
                </li>
              </ul>
            </div>

            <div className="link-column">
              <h4>Support</h4>
              <ul>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
                <li>
                  <a href="#Works">How it Works</a>
                </li>
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="newsletter-section">
            <h4>Stay Updated</h4>
            <p>
              Get the latest car drops and market news directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? (
                    <div className="loader"></div>
                  ) : (
                    <SendIcon fontSize="small" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} CarAuras. All rights reserved.
          </p>
          <div className="legal-links">
            <a href="/privacy">Privacy</a>
            <span className="separator">•</span>
            <a href="/terms">Terms</a>
            <span className="separator">•</span>
            <a href="/sitemap">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
