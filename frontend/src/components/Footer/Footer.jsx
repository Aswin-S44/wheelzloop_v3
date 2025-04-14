import React from "react";
import "./Footer.css";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import EmailIcon from "@mui/icons-material/Email";

function Footer() {
  return (
    <>
      <footer className="footer">
        {/* <div className="footer-extra-box">
          <h3>STAY UPTODATE WITH OUR LATEST UPDATES</h3>
          <p>
            Subscribe to receive the latest deals and updates on used cars
            directly to your inbox.
          </p>
          <div className="newsletter">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button className="newsletter-btn">Subscribe</button>
          </div>
        </div> */}
        <div className="footer-extra-box">
          <h3>STAY UPTODATE WITH OUR LATEST UPDATES</h3>
          <p>Follow us on social media</p>
          {/* <div className="newsletter">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button className="newsletter-btn">Subscribe</button>
          </div> */}
        </div>
        <div className="footer-container">
          <div className="footer-section footer-logo">
            <h2>WheelzLoop</h2>
            <p>Your trusted partner for buying and selling used cars.</p>
          </div>
          <div className="footer-section footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/used-cars">Find cars</a>
              </li>
              <li>
                <a href="/favourites">Favourites</a>
              </li>
              <li>
                <a href="/chats">Chats</a>
              </li>
              <li>
                <a href="/about-us">About Us</a>
              </li>
              <li>
                <a href="/reviews">Reviews</a>
              </li>
              <li>
                <a href="/blogs">Blogs</a>
              </li>
              <li>
                <a href="/signin">Login to account?</a>
              </li>
              <li>
                <a href="/signup">Create new account?</a>
              </li>
            </ul>
          </div>
          <div className="footer-section footer-resources">
            <h3>Resources</h3>
            <ul>
              <li>
                <a href="/blogs">Blog</a>
              </li>
              <li>
                <a href="#guides">Guides</a>
              </li>
              <li>
                <a href="#support">Support</a>
              </li>
              <li>
                <a href="#terms">Terms & Conditions</a>
              </li>
            </ul>
          </div>
          <div className="footer-section footer-contact">
            <h3>Contact Us</h3>
            {/* <p>123 Auto Lane, CarCity, Country</p> */}
            <p>
              <EmailIcon /> wheelzloop@gmail.com
            </p>
            {/* <p>Phone: +1 (555) 123-4567</p> */}
          </div>
          <div className="footer-section footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a
                href="https://www.facebook.com/profile.php?id=61565890412918"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook page"
              >
                <Facebook fontSize="large" />
              </a>
              <a
                href="https://x.com/WheelzLoop"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X page"
              >
                <XIcon fontSize="large" />
              </a>
              <a
                href="https://www.instagram.com/wheelz_loop/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram page"
              >
                <Instagram fontSize="large" />
              </a>
              <a
                href="https://www.linkedin.com/in/wheelzloop-used-car-selling-platform-baa71b352/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Linkedin page"
              >
                <LinkedIn fontSize="large" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} WheelzLoop. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
