import React from "react";
import "./Footer.css";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import EmailIcon from "@mui/icons-material/Email";
import { FACEBOOK, INSTAGRAM, LINKEDIN, X } from "../../constants/social-urls";

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
          <h3 style={{ fontWeight: "bold" }}>
            STAY UPTODATE WITH OUR LATEST UPDATES
          </h3>
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
            <h3 style={{ color: "#606cbc", fontWeight: "bold" }}>WheelzLoop</h3>
            <p>Your trusted partner for buying and selling used cars.</p>
          </div>
          <div className="footer-section footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/used-cars" title="Find used cars">
                  Find cars
                </a>
              </li>
              <li>
                <a href="/favourites" title="View saved cars">
                  Favourites
                </a>
              </li>
              <li>
                <a href="/chats" title="my chats">
                  Chats
                </a>
              </li>
              <li>
                <a href="/about-us" title="about us">
                  About Us
                </a>
              </li>
              <li>
                <a href="/reviews" title="reviews">
                  Reviews
                </a>
              </li>
              <li>
                <a href="/blogs" title="blogs">
                  Blogs
                </a>
              </li>
              <li>
                <a href="/signin" title="login">
                  Login to account?
                </a>
              </li>
              <li>
                <a href="/signup" title="signup">
                  Create new account?
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section footer-resources">
            <h3>Resources</h3>
            <ul>
              <li>
                <a href="/blogs" title="blogs">
                  Blog
                </a>
              </li>
              <li>
                <a href="#guides" title="guides">
                  Guides
                </a>
              </li>
              <li>
                <a href="#support" title="support">
                  Support
                </a>
              </li>
              <li>
                <a href="#terms" title="terms and conditions">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section footer-contact">
            <h3>Contact Us</h3>
            {/* <p>123 Auto Lane, CarCity, Country</p> */}
            <p>
              <EmailIcon style={{ color: "#606cbc" }} /> wheelzloop@gmail.com
            </p>
            {/* <p>Phone: +1 (555) 123-4567</p> */}
          </div>
          <div className="footer-section footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook page"
                title="facebook page"
              >
                <Facebook style={{ color: "#606cbc" }} fontSize="large" />
              </a>
              <a
                href={X}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X page"
                title="x page"
              >
                <XIcon style={{ color: "#606cbc" }} fontSize="large" />
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram page"
                title="instagram"
              >
                <Instagram style={{ color: "#606cbc" }} fontSize="large" />
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Linkedin page"
                title="linkedin"
              >
                <LinkedIn style={{ color: "#606cbc" }} fontSize="large" />
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
