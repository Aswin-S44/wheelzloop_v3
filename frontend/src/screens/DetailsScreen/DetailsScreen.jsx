import React, { useContext, useEffect, useState } from "react";
import "./DetailsScreen.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ADD_CHAT_USER, CAR_DETAILS_API, GET_ALL_CARS } from "../../config/api";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import Loader from "../../components/Loader/Loader";
import {
  FaGasPump,
  FaTachometerAlt,
  FaHeart,
  FaShareAlt,
  FaPhone,
  FaMapMarkerAlt,
  FaCar,
  FaPalette,
  FaChair,
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
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

function DetailsScreen() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavourite, setIsFavourite] = useState(false);
  const [similarCars, setSimilarCars] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNavigatetoChat = async () => {
    const token = localStorage.getItem("token");
    if (!user) {
      handleOpen();
    } else {
      try {
        await axios.post(
          `${ADD_CHAT_USER}`,
          { receiverId: car?.dealer_id?._id },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        window.location.href = "/chats";
      } catch (error) {
        toast.error("Failed to start chat.");
      }
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
          if (favCars.includes(id)) {
            setIsFavourite(true);
          }
          setMainImage(res.data.data.images[0]);
        }
      } catch (error) {
        toast.error("Failed to fetch car details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  useEffect(() => {
    const fetchSimilarCars = async () => {
      if (car) {
        try {
          const similar_cars = await axios.get(
            `${GET_ALL_CARS}?brand=${car?.brand}&dealer_id=${car?.dealer_id?._id}`
          );
          if (similar_cars) {
            setSimilarCars(
              similar_cars.data.data.filter((item) => item._id !== car._id)
            );
          }
        } catch (error) {
          toast.error("Failed to fetch similar cars.");
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
      .then(notify)
      .catch((err) => toast.error("Failed to copy link."));
  };

  const addToFav = () => {
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
        <title>{car?.title || car?.brand + " " + car?.model} - CarAuras</title>
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
          content={`${car?.brand} ${car?.model} - CarAuras`}
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
        <div className="image-gallery">
          <div className="main-image-wrapper">
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
              <button className="icon-btn" onClick={addToFav}>
                <FaHeart className={isFavourite ? "saved" : ""} />
              </button>
              <button className="icon-btn" onClick={handleShareClick}>
                <FaShareAlt />
              </button>
            </div>
            <div className="image-views-badge">
              {car.views?.toLocaleString()} views
            </div>
          </div>
          <div className="thumbnail-grid">
            {car.images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail-item ${
                  mainImage === image ? "active" : ""
                }`}
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

        <div className="car-details-main">
          <div className="car-header">
            <h1 className="car-title">
              {car.year} {car.make} {car.model}
            </h1>
            <p className="car-location">
              <FaMapMarkerAlt /> {car.location || "Location not specified"}
            </p>
            <div className="price-info">
              <span className="current-price">
                ${car.price?.toLocaleString()}
              </span>
              {car.originalPrice && (
                <span className="original-price">
                  ${car.originalPrice?.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div className="specs-overview">
            <div className="spec-card">
              <FaTachometerAlt className="spec-icon" />
              <p className="spec-label">Mileage</p>
              <p className="spec-value">{car.mileage?.toLocaleString()} mi</p>
            </div>
            <div className="spec-card">
              <FaGasPump className="spec-icon" />
              <p className="spec-label">Fuel</p>
              <p className="spec-value">{car.fuel_type}</p>
            </div>
            <div className="spec-card">
              <BsFillGearFill className="spec-icon" />
              <p className="spec-label">Transmission</p>
              <p className="spec-value">{car.transmission}</p>
            </div>
            <div className="spec-card">
              <GiCarWheel className="spec-icon" />
              <p className="spec-label">Drivetrain</p>
              <p className="spec-value">{car.drivetrain}</p>
            </div>
          </div>

          <div className="action-buttons-group">
            <a
              href={`tel:${car?.dealer_id?.phone}`}
              className="btn primary-btn"
            >
              <FaPhone /> Contact Seller
            </a>
            {car?.dealer_id?._id !== user?._id && (
              <button
                className="btn secondary-btn"
                onClick={handleNavigatetoChat}
              >
                Chat with Dealer
              </button>
            )}
          </div>

          <div className="seller-card-modern">
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
              className="btn outline-btn"
              onClick={() =>
                (window.location.href = `/profile/${car?.dealer_id._id}`)
              }
            >
              View Full Profile
            </button>
          </div>
        </div>
      </div>

      <div className="info-tabs">
        <button
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
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

      <div className="tab-content-area">
        {activeTab === "overview" && (
          <div className="overview-section">
            <h2>Vehicle Description</h2>
            <p className="car-description">
              {car.description || "No description available."}
            </p>
            <p
              className={`car-status ${
                car?.status === "Available" ? "status-available" : "status-sold"
              }`}
            >
              {car?.status}
            </p>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="specs-section">
            <div className="specs-grid-detailed">
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
                  <BsFillGearFill /> Mechanical
                </h3>
                <SpecItem label="Engine" value={car.engine_size} />
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

      {similarCars.length > 0 && (
        <div className="similar-vehicles-section">
          <h2>Similar Vehicles</h2>
          <div className="similar-cars-grid">
            {similarCars.map((item) => (
              <div
                key={item._id}
                className="similar-car-card"
                onClick={() => {
                  window.location.href = `/car/${item._id}`;
                }}
              >
                <div className="similar-car-image">
                  <img
                    src={item?.images?.[0]}
                    alt={`${item?.brand} ${item?.model}`}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/300x200?text=Image+Not+Available")
                    }
                  />
                </div>
                <div className="similar-car-info">
                  <h4>
                    {item?.year} {item?.make} {item?.model}
                  </h4>
                  <p className="similar-car-price">
                    ${(item?.price ?? "").toLocaleString()}
                  </p>
                  <div className="similar-car-specs">
                    <span>{item?.mileage ?? ""} mi</span>
                    <span>{item?.fuel_type ?? ""}</span>
                    <span>{item?.transmission ?? ""}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="login-prompt-modal">
            <span className="modal-message">
              You need to create an account to chat with the dealer.
            </span>
            <button
              className="btn primary-btn"
              onClick={() => (window.location.href = "/signin")}
            >
              Go to Login
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

const SpecItem = ({ label, value }) => (
  <div className="spec-row">
    <span className="spec-label-item">{label}</span>
    <span className="spec-value-item">{value}</span>
  </div>
);

export default DetailsScreen;
