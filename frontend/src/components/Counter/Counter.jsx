import React, { useEffect, useState } from "react";
import "./Counter.css";
import axios from "axios";
import { STATS_COUNT } from "../../config/api"; // Assuming this is defined

function Counter() {
  const [counts, setCounts] = useState({
    cars: 0,
    customers: 0,
    brands: 0,
  });

  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState({
    cars: 1250, // Default or initial value
    customers: 850,
    brands: 35,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const res = await axios.get(`${STATS_COUNT}`);
        // if (res && res.data) {
        //   setApiData(res.data);
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updateCounts = (key, step, limit) => {
      const interval = setInterval(() => {
        setCounts((prev) => {
          const newCount = prev[key] + step;
          if (newCount >= limit) {
            clearInterval(interval);
            return { ...prev, [key]: limit };
          }
          return { ...prev, [key]: newCount };
        });
      }, 20);
      return () => clearInterval(interval); // Cleanup on unmount or dependency change
    };

    const cleanupCars = updateCounts("cars", 25, apiData.cars);
    const cleanupCustomers = updateCounts("customers", 15, apiData.customers);
    const cleanupBrands = updateCounts("brands", 2, apiData.brands);

    return () => {
      cleanupCars();
      cleanupCustomers();
      cleanupBrands();
    };
  }, [apiData]); // Rerun when apiData changes

  return (
    <section className="counter-section" id="Our Achievements">
      <div className="section-header">
        <h2>Our Achievements</h2>
        <p>Driving excellence in every number</p>
      </div>

      <div className="counter-container">
        {Object.entries(counts).map(([key, value]) => (
          <div key={key} className="counter-item">
            <div className="counter-box">
              <div className="counter-value">
                {value}
                <span className="counter-plus">+</span>
              </div>
            </div>
            <p className="counter-label">
              {key === "cars" && "Cars Available"}
              {key === "customers" && "Happy Customers"}
              {key === "brands" && "Top Brands"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Counter;
