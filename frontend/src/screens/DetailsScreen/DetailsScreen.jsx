import React, { useEffect, useState } from "react";
import "./DetailsScreen.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CAR_DETAILS_API } from "../../config/api";
import Loader from "../../components/Loader/Loader";
import {
  FaCar,
  FaGasPump,
  FaTachometerAlt,
  FaPalette,
  FaDoorOpen,
  FaChair,
  FaCarSide,
  FaHeart,
  FaShareAlt,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import { GiCarWheel } from "react-icons/gi";

function DetailsScreen() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`${CAR_DETAILS_API}/${id}`);
        if (res?.data?.data) {
          setCar(res.data.data);
          setMainImage(res.data.data.images[0]);
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) return <Loader />;
  if (!car) return <div className="error-message">Car not found</div>;

  return (
    <div className="details-container">
      <div className="breadcrumb">
        <span>Home</span> &gt; <span>{car.make}</span> &gt;{" "}
        <span>{car.model}</span>
      </div>

      <div className="details-content">
        <div className="image-section">
          <div className="main-image-container">
            <img
              src={mainImage}
              alt="Main Car"
              className="main-image"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/800x600?text=Image+Not+Available")
              }
            />
            <div className="image-actions">
              <button className="save-btn" onClick={() => setSaved(!saved)}>
                <FaHeart className={saved ? "saved" : ""} />
              </button>
              <button className="share-btn">
                <FaShareAlt />
              </button>
            </div>
            <div className="image-badge">
              {car.views?.toLocaleString()} views
            </div>
          </div>
          <div className="thumbnail-container">
            {car.images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${mainImage === image ? "active" : ""}`}
                onClick={() => setMainImage(image)}
              >
                <img
                  src={image}
                  alt={`Car ${index + 1}`}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/100x75?text=Image+Not+Available")
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="info-section">
          <div className="header-section">
            <h1>
              {car.year} {car.make} {car.model}
            </h1>
            <div className="price-section">
              <span className="current-price">
                ${car.price?.toLocaleString()}
              </span>
              {car.originalPrice && (
                <span className="original-price">
                  ${car.originalPrice?.toLocaleString()}
                </span>
              )}
            </div>
            <div className="location">
              <FaMapMarkerAlt /> {car.location || "Location not specified"}
            </div>
          </div>

          <div className="quick-specs">
            <div className="spec-item">
              <FaTachometerAlt />
              <span>{car.mileage?.toLocaleString()} mi</span>
            </div>
            <div className="spec-item">
              <FaGasPump />
              <span>{car.fuel_type}</span>
            </div>
            <div className="spec-item">
              <BsFillGearFill />
              <span>{car.transmission}</span>
            </div>
            <div className="spec-item">
              <GiCarWheel />
              <span>{car.drivetrain}</span>
            </div>
          </div>

          <div className="action-buttons">
            <button className="contact-btn">
              <FaPhone /> Contact Seller
            </button>
            <button className="finance-btn">Get Financing</button>
          </div>

          <div className="seller-info">
            <h3>Seller Information</h3>
            <div className="seller-details">
              <div className="seller-avatar">D</div>
              <div>
                <p className="seller-name">Dealer Name</p>
                <p className="seller-rating">★★★★☆ (24 reviews)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="details-tabs">
        <button
          className={`tab-btn ${activeTab === "details" ? "active" : ""}`}
          onClick={() => setActiveTab("details")}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === "specs" ? "active" : ""}`}
          onClick={() => setActiveTab("specs")}
        >
          Specifications
        </button>
        <button
          className={`tab-btn ${activeTab === "features" ? "active" : ""}`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "details" && (
          <div className="overview-section">
            <h2>Vehicle Description</h2>
            <p>{car.description || "No description available."}</p>

            <div className="history-section">
              <h3>Vehicle History</h3>
              <div className="history-item">
                <FaCalendarAlt />
                <span>Last serviced: 3 months ago</span>
              </div>
              <div className="history-item">
                <FaCalendarAlt />
                <span>Clean title</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="specs-section">
            <div className="specs-grid">
              <div className="spec-group">
                <h3>
                  <FaCar /> Vehicle
                </h3>
                <SpecItem label="Make" value={car.make} />
                <SpecItem label="Model" value={car.model} />
                <SpecItem label="Year" value={car.year} />
                <SpecItem label="Condition" value={car.condition} />
              </div>

              <div className="spec-group">
                <h3>
                  <GiCarWheel /> Mechanical
                </h3>
                <SpecItem label="Engine" value={car.engine_size} />
                <SpecItem label="Drivetrain" value={car.drivetrain} />
                <SpecItem label="Transmission" value={car.transmission} />
                <SpecItem label="Fuel Type" value={car.fuel_type} />
              </div>

              <div className="spec-group">
                <h3>
                  <FaPalette /> Exterior
                </h3>
                <SpecItem label="Body Type" value={car.body_type} />
                <SpecItem label="Color" value={car.color} />
                <SpecItem label="Doors" value={car.doors} />
              </div>

              <div className="spec-group">
                <h3>
                  <FaChair /> Interior
                </h3>
                <SpecItem label="Seats" value={car.seats} />
                <SpecItem label="VIN" value={car.vin} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <div className="features-section">
            <h2>Features & Options</h2>
            <div className="features-grid">
              {car.features?.length > 0 ? (
                car.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span>✓</span> {feature}
                  </div>
                ))
              ) : (
                <p>No features listed.</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="similar-section">
        <h2>Similar Vehicles</h2>
        <div className="similar-cars">
          {[1, 2, 3].map((item) => (
            <div key={item} className="similar-card">
              <div className="similar-image"></div>
              <div className="similar-info">
                <h4>
                  2022 {car.make} {car.model}
                </h4>
                <p>${(car.price - 5000).toLocaleString()}</p>
                <div className="similar-specs">
                  <span>{car.mileage - 5000} mi</span>
                  <span>{car.fuel_type}</span>
                  <span>{car.transmission}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SpecItem = ({ label, value }) => (
  <div className="spec-row">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default DetailsScreen;
