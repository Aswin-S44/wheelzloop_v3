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
  FaHeart,
  FaShareAlt,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { BsFillGearFill, BsCalendarCheck } from "react-icons/bs";
import { GiCarWheel } from "react-icons/gi";
import { UserContext } from "../../hooks/UserContext";
import { Box, Modal } from "@mui/material";
import { DEFAULT_AVATAR } from "../../constants/urls";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 400,
  bgcolor: "background.paper",
  borderRadius: "12px",
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
      try {
        await axios.post(
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
      } catch (error) {
        console.error(error);
      }
    }
  };

  const notify = () => toast.success("Link copied to clipboard");

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
        try {
          const similar_cars = await axios.get(
            `${GET_ALL_CARS}?brand=${car?.brand}&dealer_id=${car?.dealer_id?._id}`
          );
          if (similar_cars) {
            setSimilarCars(similar_cars.data.data);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchSimilarCars();
  }, [car]);

  if (loading) return <Loader />;
  if (!car) return <div className="error-screen">Car not found</div>;

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
      toast.info("Removed from favourites");
      setIsFavourite(false);
    }
  };

  return (
    <div className="screen">
      <div className="details-wrapper">
        <Helmet>
          <title>
            {car?.title || car?.brand + " " + car?.model} - CarAuras
          </title>
          <meta
            name="description"
            content={`Buy ${car?.brand} ${car?.model} in ${car?.location}. ${car?.kilometers_driven} driven, ${car?.fuel_type} car.`}
          />
        </Helmet>

        <div className="breadcrumb-nav">
          <a href="/">Home</a>
          <span className="sep">/</span>
          <a href="/cars">Used Cars</a>
          <span className="sep">/</span>
          <span className="current">
            {car.year} {car.make} {car.model}
          </span>
        </div>

        <div className="main-grid">
          <div className="left-column">
            <div className="gallery-section">
              <div className="main-view">
                <img
                  src={mainImage}
                  alt={`${car.make} ${car.model}`}
                  className="hero-image"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/800x600?text=No+Image")
                  }
                />
                <div className="overlay-actions">
                  <button
                    className={`action-icon-btn ${isFavourite ? "liked" : ""}`}
                    onClick={addToFav}
                  >
                    <FaHeart />
                  </button>
                  <button
                    className="action-icon-btn"
                    onClick={handleShareClick}
                  >
                    <FaShareAlt />
                  </button>
                </div>
                <div className="view-badge">
                  {car.views?.toLocaleString()} views
                </div>
              </div>
              <div className="thumb-strip">
                {car.images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumb-item ${
                      mainImage === image ? "selected" : ""
                    }`}
                    onClick={() => setMainImage(image)}
                  >
                    <img src={image} alt="thumbnail" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mobile-only-header">
              <h1 className="vehicle-title">
                {car.year} {car.make} {car.model}
              </h1>
              <p className="vehicle-price">${car.price?.toLocaleString()}</p>
            </div>

            <div className="tabs-container">
              <div className="tabs-header">
                <button
                  className={activeTab === "details" ? "active" : ""}
                  onClick={() => setActiveTab("details")}
                >
                  Overview
                </button>
                <button
                  className={activeTab === "specs" ? "active" : ""}
                  onClick={() => setActiveTab("specs")}
                >
                  Specs
                </button>
                <button
                  className={activeTab === "features" ? "active" : ""}
                  onClick={() => setActiveTab("features")}
                >
                  Features
                </button>
              </div>

              <div className="tabs-body">
                {activeTab === "details" && (
                  <div className="tab-pane fade-in">
                    <div className="quick-stats">
                      <div className="stat-box">
                        <FaTachometerAlt />
                        <div>
                          <span>Mileage</span>
                          <strong>{car.mileage?.toLocaleString()} mi</strong>
                        </div>
                      </div>
                      <div className="stat-box">
                        <FaGasPump />
                        <div>
                          <span>Fuel</span>
                          <strong>{car.fuel_type}</strong>
                        </div>
                      </div>
                      <div className="stat-box">
                        <BsFillGearFill />
                        <div>
                          <span>Trans</span>
                          <strong>{car.transmission}</strong>
                        </div>
                      </div>
                      <div className="stat-box">
                        <GiCarWheel />
                        <div>
                          <span>Drivetrain</span>
                          <strong>{car.drivetrain}</strong>
                        </div>
                      </div>
                    </div>
                    <h3 className="section-heading">Description</h3>
                    <p className="description-text">
                      {car.description ||
                        "No detailed description provided by the seller."}
                    </p>
                    <div
                      className={`status-tag ${
                        car?.status === "Available" ? "green" : "red"
                      }`}
                    >
                      Status: {car?.status}
                    </div>
                  </div>
                )}

                {activeTab === "specs" && (
                  <div className="tab-pane fade-in">
                    <div className="specs-table">
                      <SpecRow icon={<FaCar />} label="Make" value={car.make} />
                      <SpecRow
                        icon={<FaCar />}
                        label="Model"
                        value={car.model}
                      />
                      <SpecRow
                        icon={<BsCalendarCheck />}
                        label="Year"
                        value={car.year}
                      />
                      <SpecRow
                        icon={<BsFillGearFill />}
                        label="Condition"
                        value={car.condition}
                      />
                      <SpecRow
                        icon={<GiCarWheel />}
                        label="Engine"
                        value={car.engine_size}
                      />
                      <SpecRow
                        icon={<BsFillGearFill />}
                        label="Transmission"
                        value={car.transmission}
                      />
                      <SpecRow
                        icon={<FaGasPump />}
                        label="Fuel Type"
                        value={car.fuel_type}
                      />
                      <SpecRow
                        icon={<FaCar />}
                        label="Body Type"
                        value={car.body_type}
                      />
                      <SpecRow
                        icon={<FaPalette />}
                        label="Color"
                        value={car.color}
                      />
                      <SpecRow
                        icon={<FaDoorOpen />}
                        label="Doors"
                        value={car.doors}
                      />
                      <SpecRow
                        icon={<FaChair />}
                        label="Seats"
                        value={car.seats}
                      />
                      <SpecRow icon={<FaCar />} label="VIN" value={car.vin} />
                    </div>
                  </div>
                )}

                {activeTab === "features" && (
                  <div className="tab-pane fade-in">
                    <div className="features-list">
                      {car.features?.length > 0 ? (
                        car.features.map((feature, index) => (
                          <div key={index} className="feature-chip">
                            {feature}
                          </div>
                        ))
                      ) : (
                        <p>No specific features listed.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="sticky-sidebar">
              <div className="info-card">
                <div className="desktop-header">
                  <h1 className="vehicle-title">
                    {car.year} {car.make} {car.model}
                  </h1>
                  <div className="location-row">
                    <FaMapMarkerAlt />{" "}
                    {car.location || "Location not available"}
                  </div>
                </div>

                <div className="price-block">
                  <span className="price-main">
                    ${car.price?.toLocaleString()}
                  </span>
                  {car.originalPrice && (
                    <span className="price-strike">
                      ${car.originalPrice?.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="action-stack">
                  <a
                    href={`tel:${car?.dealer_id?.phone}`}
                    className="btn-primary"
                  >
                    <FaPhone /> Call Seller
                  </a>
                  {car?.dealer_id?._id !== user?._id && (
                    <button
                      className="btn-secondary"
                      onClick={handleNavigatetoChat}
                    >
                      Chat with Dealer
                    </button>
                  )}
                </div>
              </div>

              <div className="seller-widget">
                <h4>Seller Information</h4>
                <div className="seller-row">
                  <img
                    src={car?.dealer_id?.profile_picture || DEFAULT_AVATAR}
                    alt="Seller"
                    onError={(e) => (e.target.src = DEFAULT_AVATAR)}
                  />
                  <div className="seller-details">
                    <span className="seller-name">
                      {car?.dealer_id?.first_name || "Dealer"}
                    </span>
                    <span className="seller-loc">
                      {car?.dealer_id?.location}
                    </span>
                  </div>
                </div>
                <button
                  className="btn-outline-sm"
                  onClick={() =>
                    (window.location.href = `/profile/${car?.dealer_id._id}`)
                  }
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {similarCars.length > 0 && (
          <div className="similar-section">
            <h2 className="section-title">Similar Vehicles</h2>
            <div className="similar-grid">
              {similarCars.map((item) => (
                <div
                  key={item._id}
                  className="car-card"
                  onClick={() => (window.location.href = `/cars/${item._id}`)}
                >
                  <div className="card-img">
                    <img
                      src={item.images?.[0]}
                      alt="car"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/300x200")
                      }
                    />
                  </div>
                  <div className="card-body">
                    <h5>
                      {item.year} {item.make} {item.model}
                    </h5>
                    <p className="card-price">
                      ${item.price?.toLocaleString()}
                    </p>
                    <div className="card-meta">
                      <span>{item.mileage} mi</span>
                      <span>•</span>
                      <span>{item.transmission}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <ToastContainer position="bottom-right" />

        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <div className="auth-modal-content">
              <h3>Login Required</h3>
              <p>Please sign in to start a chat with the dealer.</p>
              <button
                className="btn-primary"
                onClick={() => (window.location.href = "/signin")}
              >
                Go to Login
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

const SpecRow = ({ icon, label, value }) => (
  <div className="spec-item">
    <div className="spec-label-grp">
      <span className="spec-icon">{icon}</span>
      <span>{label}</span>
    </div>
    <span className="spec-val">{value || "Not available"}</span>
  </div>
);

export default DetailsScreen;
