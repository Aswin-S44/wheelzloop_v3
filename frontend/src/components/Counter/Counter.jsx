import React, { useEffect, useState } from "react";
import "./Counter.css";
import axios from "axios";
import { STATS_COUNT } from "../../config/api";
import SpeedIcon from "@mui/icons-material/Speed";
import GroupsIcon from "@mui/icons-material/Groups";
import DiamondIcon from "@mui/icons-material/Diamond";

function Counter() {
  const [counts, setCounts] = useState({
    cars: 0,
    customers: 0,
    brands: 0,
  });

  const [targetCounts, setTargetCounts] = useState({
    cars: 1250,
    customers: 850,
    brands: 35,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${STATS_COUNT}`);
        if (res && res.data) {
          setTargetCounts(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Custom easing function for smooth counter
    const easeOutQuad = (t) => t * (2 - t);
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = easeOutQuad(frame / totalFrames);

      setCounts((prev) => {
        if (frame >= totalFrames) {
          clearInterval(timer);
          return targetCounts;
        }
        return {
          cars: Math.floor(targetCounts.cars * progress),
          customers: Math.floor(targetCounts.customers * progress),
          brands: Math.floor(targetCounts.brands * progress),
        };
      });
    }, frameDuration);

    return () => clearInterval(timer);
  }, [targetCounts]);

  return (
    <section className="hud-stats-section" id="Achievements">
      {/* Background Effects */}
      <div className="hud-grid-bg"></div>
      <div className="hud-glow-spot spot-1"></div>
      <div className="hud-glow-spot spot-2"></div>

      <div className="hud-container">
        <div className="hud-header">
          <h2 className="hud-title">
            MARKET <span className="neon-text">DOMINANCE</span>
          </h2>
          <div className="hud-line"></div>
        </div>

        <div className="hud-cards-wrapper">
          {/* Card 1: Cars */}
          <div className="hud-card card-cyan">
            <div className="hud-card-inner">
              <div className="hud-icon-box">
                <SpeedIcon className="hud-icon" />
              </div>
              <div className="hud-data">
                <h3 className="hud-number">
                  {counts.cars}
                  <span className="hud-suffix">+</span>
                </h3>
                <p className="hud-label">Premium Vehicles</p>
              </div>
            </div>
            <div className="hud-progress-bar">
              <div
                className="hud-fill fill-cyan"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>

          {/* Card 2: Customers */}
          <div className="hud-card card-purple">
            <div className="hud-card-inner">
              <div className="hud-icon-box">
                <GroupsIcon className="hud-icon" />
              </div>
              <div className="hud-data">
                <h3 className="hud-number">
                  {counts.customers}
                  <span className="hud-suffix">K</span>
                </h3>
                <p className="hud-label">Happy Clients</p>
              </div>
            </div>
            <div className="hud-progress-bar">
              <div
                className="hud-fill fill-purple"
                style={{ width: "70%" }}
              ></div>
            </div>
          </div>

          {/* Card 3: Brands */}
          <div className="hud-card card-amber">
            <div className="hud-card-inner">
              <div className="hud-icon-box">
                <DiamondIcon className="hud-icon" />
              </div>
              <div className="hud-data">
                <h3 className="hud-number">
                  {counts.brands}
                  <span className="hud-suffix">+</span>
                </h3>
                <p className="hud-label">Global Brands</p>
              </div>
            </div>
            <div className="hud-progress-bar">
              <div
                className="hud-fill fill-amber"
                style={{ width: "90%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Counter;
