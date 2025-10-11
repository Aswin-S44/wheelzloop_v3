import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCar,
  FaUser,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import "./ContactScreen.css";
import axios from "axios";
import {
  FACEBOOK,
  INSTAGRAM,
  LINKEDIN,
  X,
  YOUTUBE,
} from "../../constants/social-urls";
import { SEND_FEEDBACK_API } from "../../config/api";

function ContactScreen() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "General Inquiry",
      message: "",
    });

    try {
      const res = await axios.post(`${SEND_FEEDBACK_API}`, formData);
      if (res && res.status == 200) {
        setSubmitted(true);
      }
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <GiCarWheel className="hero-icon" />
          <h1>Contact WheelzLoop</h1>
          <p>We're here to help with all your used car needs</p>
        </div>
      </section>

      {/* Contact Content */}
      <div className="contact-content">
        {/* Contact Info */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            Have questions about our services or a specific vehicle? Reach out
            to our team.
          </p>

          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">
                <FaEnvelope />
              </div>
              <h3>Email Us</h3>
              <p>wheelzloop@gmail.com</p>
              <p>Response within 24 hours</p>
            </div>
          </div>

          {/* New Follow Us Section */}
          <div className="follow-us-section">
            <h2>Follow Us</h2>
            <p>Stay connected for the latest updates and offers</p>
            <div className="social-icons">
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaFacebook />
              </a>
              <a
                href={X}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaTwitter />
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaInstagram />
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaLinkedin />
              </a>
              <a
                href={YOUTUBE}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          {submitted ? (
            <div className="success-message">
              <h3>Thank you for contacting us!</h3>
              <p>We've received your message and will get back to you soon.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">
                  <FaUser className="input-icon" /> Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Vehicle Question">Vehicle Question</option>
                  <option value="Dealer Inquiry">Dealer Inquiry</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? <> Please wait....</> : <> Send Message</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactScreen;
