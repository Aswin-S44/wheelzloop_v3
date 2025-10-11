import React, { useState } from "react";
import "./Footer.css";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import EmailIcon from "@mui/icons-material/Email";
import { FACEBOOK, INSTAGRAM, LINKEDIN, X } from "../../constants/social-urls";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import axios from "axios";
import { ADD_SUBSCRIPTION_URL } from "../../config/api";
import Swal from "sweetalert2";

function Footer() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const handleSubscribe = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (email) {
        const res = await axios.post(ADD_SUBSCRIPTION_URL, { email });
        setLoading(false);
        if (res && res.status === 200) {
          Swal.fire({
            title: "Subscription added!",
            text: "Thank you for subscribing with us!",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "You are already subscribed",
            icon: "success",
            draggable: true,
          });
        }
        setEmail("");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      Swal.fire({
        title: "You are already subscribed",
        icon: "success",
        draggable: true,
      });
      setLoading(false);
      setEmail("");
    }
  };
  return (
    <>
      {/* <footer className="footer">
       
        <div className="footer-extra-box">
          <h3 style={{ fontWeight: "bold" }}>
            STAY UPTODATE WITH OUR LATEST UPDATES
          </h3>
          <p>Follow us on social media</p>
         
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
 
            <p>
              <EmailIcon style={{ color: "#606cbc" }} /> wheelzloop@gmail.com
            </p>

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
      </footer> */}

      <footer className="footer">
        <div class="content">
          <div class="top">
            <div class="logo-details">
              <img src="/images/logo.png" className="footer-logo" alt="logo" />
            </div>
            <div class="media-icons">
              <a target="_blank" href="#">
                {" "}
                <FacebookIcon
                  className="icon font-size-footer"
                  style={{ color: "#fff" }}
                />
              </a>
              <a target="_blank" href="https://www.instagram.com/wheelz_loop/">
                <InstagramIcon
                  className="icon font-size-footer"
                  style={{ color: "#fff" }}
                />
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/wheelzloop-used-car-selling-platform-baa71b352/?originalSubdomain=in"
              >
                <LinkedInIcon
                  className="icon font-size-footer"
                  style={{ color: "#fff" }}
                />
              </a>
              <a target="_blank" href="https://www.youtube.com/@wheelzloop">
                <YouTubeIcon
                  className="icon font-size-footer"
                  style={{ color: "#fff" }}
                />
              </a>
            </div>
          </div>
          <div class="link-boxes">
            <ul class="box">
              <li class="link_name">Company</li>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/contact-us">Contact us</a>
              </li>
              <li>
                <a href="/about-us">About us</a>
              </li>
              <li>
                <a href="/signin">Get started</a>
              </li>
            </ul>
            <ul class="box">
              <li class="link_name">Services</li>
              <li>
                <a href="/used-cars">Find-Cars</a>
              </li>
              <li>
                <a href="/favourites">Favourites</a>
              </li>
              <li>
                <a href="/reviews">Reviews</a>
              </li>
              <li>
                <a href="/blogs">Blogs</a>
              </li>
            </ul>
            <ul class="box">
              <li class="link_name">Account</li>
              <li>
                <a href="/signin">Profile</a>
              </li>
              <li>
                <a href="/signin">Sign In</a>
              </li>
              <li>
                <a href="/signup">Create New Account</a>
              </li>
              
            </ul>
            <ul class="box">
              <li class="link_name">Useful Links</li>
              <li>
                <a href="#faq">Faq</a>
              </li>
              <li>
                <a href="#Works">How It Works</a>
              </li>
              <li>
                <a href="#Our Achievements">Our Achievements</a>
              </li>
              <li>
                <a href="#Choose by Category">Choose by Category</a>
              </li>
            </ul>
            <ul class="box input-box">
              <form onSubmit={handleSubscribe}>
                <li class="link_name">Subscribe</li>
                <li>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </li>
                <li>
                  {/* <input type="button" value="Subscribe" /> */}
                  <button
                    type="submit"
                    className="subsri-btn"
                    disabled={loading}
                  >
                    {loading ? "Please wait" : "Subscribe"}
                  </button>
                </li>
              </form>
            </ul>
          </div>
        </div>
        <div class="bottom-details">
          <div class="bottom_text">
            <span class="copyright_text">
              Copyright © 2021 <a href="https://wheelzloop.com/">WheelzLoop.</a>
              All rights reserved
            </span>
            <span class="policy_terms">
              <a href="#">Privacy policy</a>
              <a href="#">Terms & condition</a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
