import React, { useContext, useEffect, useState } from "react";
import "./DetailsScreen.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ADD_CHAT_USER, CAR_DETAILS_API, GET_ALL_CARS } from "../../config/api";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";

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
import { UserContext } from "../../hooks/UserContext";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function DetailsScreen() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [saved, setSaved] = useState(false);
  const [similarCars, setSimilarCars] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNavigatetoChat = async () => {
    const token = localStorage.getItem("token");
    if (!user) {
      handleOpen();
    } else {
      const res = await axios.post(
        `${ADD_CHAT_USER}`,
        {
          receiverId: car?.dealer_id?._id,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.href = "/chats";
    }
  };

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
        return error;
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
        return err;
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
      <Helmet>
        <title>
          {car?.title || car?.brand + " " + car?.model} - WheelzLoop
        </title>
        <meta
          name="description"
          content={`Buy ${car?.brand} ${car?.model} in ${car?.location}. ${car?.kilometers_driven} driven, ${car?.fuel_type} car in good condition. Check price & details now.`}
        />
        <meta
          name="keywords"
          content={`${car?.brand}, ${car?.model}, used cars in ${car?.location}, second hand ${car?.brand}, pre-owned ${car?.model}, buy used car Kerala`}
        />
        <meta
          property="og:title"
          content={`${car?.brand} ${car?.model} - WheelzLoop`}
        />
        <meta
          property="og:description"
          content={`Buy this ${car?.fuel_type} ${car?.brand} ${car?.model} car in ${car?.location}. Explore details now.`}
        />
        <meta property="og:image" content={car?.images?.[0]} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.wheelzloop.com/cars/${id}`}
        />
        <link rel="canonical" href={`https://www.wheelzloop.com/cars/${id}`} />
      </Helmet>
      <div className="breadcrumb">
        <a href="/">Home</a>
        <span className="separator">/</span>

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
              title="car details image"
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
                  title="car more images"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="car-info-section">
          <div className="car-header">
            <h1 className="car-title">
              {car.year} {car.make} {car.model}
            </h1>

            <div className="price-container">
              <span className="current-price">
                ${car.price?.toLocaleString()}
              </span>
              {car.originalPrice && (
                <span className="original-price">
                  ${car.originalPrice?.toLocaleString()}
                </span>
              )}
            </div>

            <div className="location-badge">
              <FaMapMarkerAlt className="location-icon" />
              <span>{car.location || "Location not specified"}</span>
            </div>
          </div>

          <div className="specs-grid">
            <div className="spec-card">
              <FaTachometerAlt className="spec-icon" />
              <div>
                <p className="spec-label">Mileage</p>
                <p className="spec-value">{car.mileage?.toLocaleString()} mi</p>
              </div>
            </div>
            <div className="spec-card">
              <FaGasPump className="spec-icon" />
              <div>
                <p className="spec-label">Fuel</p>
                <p className="spec-value">{car.fuel_type}</p>
              </div>
            </div>
            <div className="spec-card">
              <BsFillGearFill className="spec-icon" />
              <div>
                <p className="spec-label">Transmission</p>
                <p className="spec-value">{car.transmission}</p>
              </div>
            </div>
            <div className="spec-card">
              <GiCarWheel className="spec-icon" />
              <div>
                <p className="spec-label">Drivetrain</p>
                <p className="spec-value">{car.drivetrain}</p>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <a
              href={`tel:${car?.dealer_id?.phone}`}
              className="contact-seller-btn"
            >
              <FaPhone /> Contact Seller
            </a>
            {car?.dealer_id?._id !== user?._id && (
              <button className="btn-secondary" onClick={handleNavigatetoChat}>
                Chat with Dealer
              </button>
            )}
          </div>

          <div className="seller-card">
            <h3 className="seller-title">Seller Information</h3>
            <div className="seller-profile">
              <img
                src={car?.dealer_id?.profile_picture || "/default-avatar.jpg"}
                alt="Dealer"
                className="seller-avatar"
              />
              <div className="seller-info">
                <p className="seller-name">
                  {car?.dealer_id?.first_name || "Dealer"}
                </p>
                <p className="seller-location">
                  {car?.dealer_id?.location || "Location not specified"}
                </p>
              </div>
            </div>
            <button
              className="btn-outline"
              onClick={() =>
                (window.location.href = `/profile/${car?.dealer_id._id}`)
              }
            >
              View Full Profile
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
                <img
                  src={item?.images?.[0]}
                  alt="no-image"
                  title="similar car images"
                />
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                padding: "24px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                maxWidth: "400px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  color: "#333",
                }}
              >
                You need to create account to chat with dealer
              </span>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#30bfa1",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "background-color 0.2s",
                  ":hover": {
                    backgroundColor: "#30bfa1",
                  },
                }}
                onClick={() => (window.location.href = "/signin")}
              >
                Go to login
              </button>
            </div>
          </>
        </Box>
      </Modal>
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
