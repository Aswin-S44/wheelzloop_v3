import React, { useEffect, useState } from "react";
import "./SavedCarsScreen.css";
import { GET_SAVED_CARS_URL } from "../../config/api";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaTrash,
  FaShareAlt,
  FaMapMarkerAlt,
  FaTachometerAlt,
  FaHeartBroken,
  FaGasPump,
} from "react-icons/fa";
import { BsFuelPumpFill } from "react-icons/bs";

function SavedCarsScreen() {
  const [savedCars, setSavedCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const removeFromFavorites = (id) => {
    const updatedCars = savedCars.filter((car) => car._id !== id);
    setSavedCars(updatedCars);
    localStorage.setItem(
      "fav-cars",
      JSON.stringify(updatedCars.map((car) => car._id))
    );
    toast.info("Vehicle removed from saved list");
  };

  useEffect(() => {
    const fetchSavedCars = async () => {
      try {
        setLoading(true);
        let favCars = JSON.parse(localStorage.getItem("fav-cars")) || [];
        let { data } = await axios.post(`${GET_SAVED_CARS_URL}`, {
          savedIds: favCars,
        });

        if (data && data.cars) {
          setSavedCars(data.cars);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedCars();
  }, []);

  const handleShare = (carId) => {
    const carUrl = `${window.location.origin}/car/${carId}`;
    navigator.clipboard.writeText(carUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="screen">
      <div className="saved-cars-wrapper">
        <div className="saved-header mt-4">
          <h1 className="page-title">Saved Cars</h1>
          <p className="page-subtitle">
            You have {savedCars.length} saved{" "}
            {savedCars.length === 1 ? "vehicle" : "vehicles"}
          </p>
        </div>

        {loading ? (
          <Loader />
        ) : savedCars?.length === 0 ? (
          <div className="empty-state-container">
            <div className="empty-icon-circle">
              <FaHeartBroken />
            </div>
            <h3>Your garage is empty</h3>
            <p>Save vehicles you're interested in to track them here.</p>
            <button
              className="btn-browse"
              onClick={() => (window.location.href = "/cars")}
            >
              Explore Vehicles
            </button>
          </div>
        ) : (
          <div className="cars-grid">
            {savedCars.map((car) => (
              <div key={car._id} className="vehicle-card">
                <div
                  className="card-image-box"
                  onClick={() => (window.location.href = `/car/${car._id}`)}
                >
                  <img
                    src={car?.images[0]}
                    alt={car.car_name}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/400x300?text=Car+Image")
                    }
                  />
                  <div className="price-badge">
                    ${car.price?.toLocaleString()}
                  </div>
                  {car.featured && (
                    <span className="featured-label">Featured</span>
                  )}
                </div>

                <div className="card-content">
                  <div className="card-header">
                    <h3 className="vehicle-name" title={car?.car_name}>
                      {car?.year} {car?.car_name ?? "Unknown Model"}
                    </h3>
                    <p className="vehicle-trim">{car?.model}</p>
                  </div>

                  <div className="specs-row">
                    <div className="spec-item">
                      <FaTachometerAlt className="spec-icon" />
                      <span>{car.mileage?.toLocaleString()} mi</span>
                    </div>
                    <div className="spec-item">
                      <BsFuelPumpFill className="spec-icon" />
                      <span>{car.fuel_type || "Petrol"}</span>
                    </div>
                    <div className="spec-item">
                      <FaMapMarkerAlt className="spec-icon" />
                      <span>{car?.location || car?.place || "N/A"}</span>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button
                      className="btn-action btn-delete"
                      onClick={() => removeFromFavorites(car?._id)}
                      title="Remove from saved"
                    >
                      <FaTrash /> Remove
                    </button>
                    <button
                      className="btn-action btn-share"
                      onClick={() => handleShare(car._id)}
                      title="Share vehicle"
                    >
                      <FaShareAlt /> Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <ToastContainer position="bottom-right" theme="colored" />
      </div>
    </div>
  );
}

export default SavedCarsScreen;
