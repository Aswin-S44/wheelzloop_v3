import React, { useEffect, useState } from "react";
import "./DetailsScreen.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CAR_DETAILS_API, GET_ALL_CARS } from "../../config/api";
import { ToastContainer, toast } from "react-toastify";

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
  const [similarCars, setSimilarCars] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);

  const notify = () => toast.success("Link copied");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`${CAR_DETAILS_API}/${id}`);
        if (res?.data?.data) {
          setCar(res.data.data);
          let favCars = JSON.parse(localStorage.getItem("fav-cars")) || [];
          if (favCars && favCars.length > 0) {
            if (favCars.includes(id)) {
              setIsFavourite(true);
            }
          }
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

  useEffect(() => {
    const fetchSimilarCars = async () => {
      if (car) {
        const similar_cars = await axios.get(
          `${GET_ALL_CARS}?brand=${car?.brand}&dealer_id=${car?.dealer_id?._id}`
        );
        if (similar_cars) {
          setSimilarCars(similar_cars.data.data);
        }
        console.log(
          "similar_cars----------",
          similar_cars ? similar_cars : "mpsimilar_cars"
        );
      }
    };
    fetchSimilarCars();
  }, [car]);

  if (loading) return <Loader />;
  if (!car) return <div className="error-message">Car not found</div>;

  const handleShareClick = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        notify();
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const addToFav = async () => {
    setSaved(!saved);
    let favCars = JSON.parse(localStorage.getItem("fav-cars")) || [];

    if (!favCars.includes(id)) {
      favCars.push(id);
      localStorage.setItem("fav-cars", JSON.stringify(favCars));
      toast.success("Added to favourites");
      setIsFavourite(true);
    } else {
      favCars = favCars.filter((favId) => favId !== id);

      localStorage.setItem("fav-cars", JSON.stringify(favCars));
      toast.error("Removed from favourites");
      setIsFavourite(false);
    }
  };

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
              <button className="save-btn" onClick={addToFav}>
                <FaHeart className={isFavourite ? "saved" : ""} />
              </button>
              <button className="share-btn" onClick={handleShareClick}>
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
            <a href={`tel: ${car?.dealer_id?.phone}`}>
              <button className="contact-btn">
                <FaPhone /> Contact Seller
              </button>
            </a>
            <button
              className="finance-btn"
              style={{ border: "1px solid grey" }}
            >
              Chat with dealer
            </button>
          </div>

          <div className="seller-info">
            <h3>Seller Information</h3>
            <div className="seller-details">
              <div className="seller-avatar">
                <img
                  src={car?.dealer_id?.profile_picture}
                  alt="no dealer image"
                  className="avatar"
                />
              </div>
              <div>
                <p className="seller-name">{car?.dealer_id?.first_name}</p>
                {/* <p className="seller-rating">★★★★☆ (24 reviews)</p> */}
                <p className="seller-rating">{car?.dealer_id?.location}</p>
              </div>
            </div>
            <button
              className="contact-btn"
              onClick={() =>
                (window.location.href = `/profile/${car?.dealer_id._id}`)
              }
            >
              Visit Profile
            </button>
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
            <h3
              style={{
                fontSize: "20px",
                color: car?.status === "Available" ? "green" : "red",
              }}
            >
              {car?.status}
            </h3>

            {/* <div className="history-section">
              <h3>Vehicle History</h3>
              <div className="history-item">
                <FaCalendarAlt />
                <span>Last serviced: 3 months ago</span>
              </div>
              <div className="history-item">
                <FaCalendarAlt />
                <span>Clean title</span>
              </div>
            </div> */}
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
                {/* <SpecItem label="Drivetrain" value={car.drivetrain} /> */}
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
        {console.log("similarCars===========", similarCars)}
        <div className="similar-cars">
          {similarCars?.map((item) => (
            <div
              key={item}
              className="similar-card"
              onClick={() => {
                window.location.href = `/car/${car?._id}`;
              }}
            >
              <div className="similar-image">
                <img src={item?.images?.[0]} alt="no-image" />
              </div>
              <div className="similar-info">
                <h4>
                  {item?.year ?? ""} {item?.car_name ?? ""} {item?.model ?? ""}
                </h4>
                <p>${(item?.price ?? "").toLocaleString()}</p>
                <div className="similar-specs">
                  <span>{item?.mileage ?? ""} mi</span>
                  <span>{item?.fuel_type ?? ""}</span>
                  <span>{item?.transmission ?? ""}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
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
