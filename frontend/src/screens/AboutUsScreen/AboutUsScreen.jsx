import React, { useEffect, useState } from "react";
import "./AboutUsScreen.css";
import { FaCar, FaShieldAlt, FaHandshake, FaChartLine } from "react-icons/fa";
import axios from "axios";
import { STATS_COUNT } from "../../config/api";

const AboutUsScreen = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${STATS_COUNT}`);
        console.log("stat count ; ", res ? res : "no res");
        if (res && res.data) {
          setData(res.data);
        }
      } catch (error) {
        console.log("Error while returning stat count : ", error);
        return error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="about-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Driving Your Dreams Forward</h1>
          <p>At WheelzLoop, we connect car lovers with their perfect rides</p>
        </div>
      </div>

      <div className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            To revolutionize the used car market by providing a seamless,
            transparent, and trustworthy platform where buyers and sellers can
            connect with confidence.
          </p>
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <FaCar className="stat-icon" />
            <h3>{data?.cars ?? 0}+</h3>
            <p>Quality Vehicles Listed</p>
          </div>
          <div className="stat-card">
            <FaHandshake className="stat-icon" />
            <h3>{data?.customers ?? 0}+</h3>
            <p>Satisfied Customers</p>
          </div>
          <div className="stat-card">
            <FaShieldAlt className="stat-icon" />
            <h3>100%</h3>
            <p>Verified Listings</p>
          </div>
          <div className="stat-card">
            <FaChartLine className="stat-icon" />
            <h3>{data?.customers ?? 0}+</h3>
            <p>Dealer Partners</p>
          </div>
        </div>
      </div>

      <div className="story-section">
        <div className="story-content">
          <h2>Our Story</h2>
          <p>
            Founded in 2020, WheelzLoop began as a small team of car enthusiasts
            frustrated with the complexities of buying and selling used
            vehicles. Today, we've grown into a trusted marketplace serving
            customers nationwide, but we've never lost our passion for making
            car transactions simple, fair, and enjoyable.
          </p>
        </div>
      </div>

      <div className="team-section">
        <h2>Meet The Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-photo placeholder-1"></div>
            <h3>Alex Johnson</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-card">
            <div className="team-photo placeholder-2"></div>
            <h3>Sarah Miller</h3>
            <p>Head of Operations</p>
          </div>
          <div className="team-card">
            <div className="team-photo placeholder-3"></div>
            <h3>David Chen</h3>
            <p>Chief Technology Officer</p>
          </div>
          <div className="team-card">
            <div className="team-photo placeholder-4"></div>
            <h3>Maria Garcia</h3>
            <p>Customer Experience Lead</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Find Your Perfect Ride?</h2>
        <button className="cta-button">Browse Inventory</button>
      </div>
    </div>
  );
};

export default AboutUsScreen;
