import React, { useEffect, useState } from "react";
import "./Counter.css";
// import { getStatCount } from "../../services/apis";

function Counter() {
  const [counts, setCounts] = useState({
    cars: 0,
    customers: 0,
    brands: 0,
  });

  const [targetCounts, setTargetCounts] = useState({
    cars: 0,
    customers: 0,
    brands: 0,
  });

  // useEffect(() => {
  //   const fetchStatCount = async () => {
  //     const res = await getStatCount();
  //     if (res) {
  //       setTargetCounts(res);
  //     }
  //   };
  //   fetchStatCount();
  // }, []);

  useEffect(() => {
    const updateCounts = (key, step, limit) => {
      return setInterval(() => {
        setCounts((prev) => ({
          ...prev,
          [key]:
            prev[key] < targetCounts[key]
              ? prev[key] + step
              : targetCounts[key],
        }));
      }, 50);
    };

    if (targetCounts.cars || targetCounts.customers || targetCounts.brands) {
      const intervals = [
        updateCounts("cars", 5, targetCounts.cars),
        updateCounts("customers", 2, targetCounts.customers),
        updateCounts("brands", 1, targetCounts.brands),
      ];

      return () => intervals.forEach(clearInterval);
    }
  }, [targetCounts]);

  return (
    <div className="mt-4">
      <h2 className="font-md text-center">OUR ACHIEVEMENTS</h2>
      <div className="counter-container">
        <div className="counter-item">
          <div className="counter-circle">
            <h2>{counts.cars}+</h2>
          </div>
          <p>Cars Available</p>
        </div>
        <div className="counter-item">
          <div className="counter-circle">
            <h2>{counts.customers}+</h2>
          </div>
          <p>Happy Customers</p>
        </div>
        <div className="counter-item">
          <div className="counter-circle">
            <h2>{counts.brands}+</h2>
          </div>
          <p>Top Brands</p>
        </div>
      </div>
    </div>
  );
}

export default Counter;
