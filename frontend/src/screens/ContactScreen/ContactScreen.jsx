import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";
import { BiSupport, BiCar } from "react-icons/bi";
import "./ContactScreen.css";
import axios from "axios";
import { FACEBOOK, INSTAGRAM, LINKEDIN, X } from "../../constants/social-urls";
import { SEND_FEEDBACK_API } from "../../config/api";

function ContactScreen() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${SEND_FEEDBACK_API}`, formData);
      if (res && res.status === 200) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        {/* Left Side: Contact Info */}
        <div className="contact-sidebar">
          <div className="sidebar-header">
            <h3>Get in Touch</h3>
            <p>
              Have questions about a car or want to sell yours? We're here to
              help you every step of the way.
            </p>
          </div>

          <div className="contact-details">
            <div className="detail-item">
              <div className="icon-circle">
                <FaPhoneAlt />
              </div>
              <div>
                <span>Call Us</span>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="icon-circle">
                <FaEnvelope />
              </div>
              <div>
                <span>Email Us</span>
                <p>hello@carauras.com</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="icon-circle">
                <FaMapMarkerAlt />
              </div>
              <div>
                <span>Visit Us</span>
                <p>123 Auto Blvd, Car City, CA</p>
              </div>
            </div>
          </div>

          <div className="sidebar-footer">
            <span>Follow our socials</span>
            <div className="social-row">
              <a href={FACEBOOK} target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
              <a href={X} target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Abstract Decor */}
          <div className="circle-decor-1"></div>
          <div className="circle-decor-2"></div>
        </div>

        {/* Right Side: Form */}
        <div className="contact-form-area">
          {submitted ? (
            <div className="success-view">
              <div className="success-icon">
                <FaPaperPlane />
              </div>
              <h2>Message Sent!</h2>
              <p>
                Thank you for reaching out. We will get back to you shortly.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn-reset">
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-header">
                <h2>Send a Message</h2>
                <p>Fill out the form below and we'll get back to you.</p>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(000) 000-0000"
                  />
                </div>
                <div className="input-group">
                  <label>Topic</label>
                  <div className="select-wrapper">
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      <option value="Buy a Car">I want to buy a car</option>
                      <option value="Sell a Car">I want to sell my car</option>
                      <option value="Support">Support Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows="4"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactScreen;
