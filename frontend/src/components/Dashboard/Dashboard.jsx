import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "./Dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [timePeriod, setTimePeriod] = useState("1month");

  const cardData = [
    { title: "Total Cars", value: "1,284", icon: "🚗", trend: "↑ 12%" },
    {
      title: "Total Profile Views",
      value: "8,542",
      icon: "👥",
      trend: "↑ 23%",
    },
    { title: "Sale Cars", value: "432", icon: "💰", trend: "↑ 5%" },
  ];

  const getChartData = (period) => {
    if (period === "1week") {
      return {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Cars Sold",
            data: [12, 19, 15, 21, 14, 25, 18],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      };
    } else if (period === "1year") {
      return {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Cars Sold",
            data: [65, 59, 80, 81, 56, 72, 45, 67, 55, 82, 68, 76],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      };
    } else {
      return {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          {
            label: "Cars Sold",
            data: [65, 59, 80, 81],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      };
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard Overview</h1>

      <div className="cards-container">
        {cardData.map((card, index) => (
          <div key={index} className="dashboard-card">
            <div className="card-icon">{card.icon}</div>
            <div className="card-content">
              <h3>{card.title}</h3>
              <h2>{card.value}</h2>
              <p className="trend">{card.trend}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-section">
        <div className="chart-header">
          <h2>Sales Analytics</h2>
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="period-selector"
          >
            <option value="1week">Last Week</option>
            <option value="1month">Last Month</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
        <div className="chart-wrapper">
          <Bar data={getChartData(timePeriod)} options={options} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
