import React, { useEffect, useState } from "react";
import "./Card.css";
import ActionMenu from "../ActionMenu/ActionMenu";
import axios from "axios";
import { ADD_CAR_VIEWS_COUNT } from "../../config/api";
import { formatViews } from "../../utils/utils";
import { ToastContainer, toast } from "react-toastify";
import {
  FaHeart,
  FaGasPump,
  FaCar,
  FaCogs,
  FaEye,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Card({ car, editable = false, category }) {
  const [favCars, setFavCars] = useState([]);

  useEffect(() => {
    const favsCarss = JSON.parse(localStorage.getItem("fav-cars")) || [];
    setFavCars(favsCarss);
  }, [car]);

  const isFavourite = favCars.includes(car?._id);

  const handleNavigateToCar = async () => {
    window.location.href = `/car/${car._id}`;
    await axios.post(`${ADD_CAR_VIEWS_COUNT}/${car._id}`);
  };

  const addToFav = () => {
    let updatedFavCars;

    if (isFavourite) {
      updatedFavCars = favCars.filter((favId) => favId !== car._id);
      toast.error("Removed from favourites");
    } else {
      updatedFavCars = [...favCars, car._id];
      toast.success("Added to favourites");
    }

    localStorage.setItem("fav-cars", JSON.stringify(updatedFavCars));
    setFavCars(updatedFavCars);
  };

  return (
    <div className="card">
      <div className="card-header">
        <img
          src={car?.images[0]}
          alt="Car"
          className="card-image"
          title={car?.car_name || "car image"}
          onClick={handleNavigateToCar}
        />

        {category && <span className="category-badge">{category}</span>}

        <button className="favorite-btn">
          {editable && <ActionMenu id={car._id} />}
          {!editable && (
            <FaHeart
              onClick={addToFav}
              className={isFavourite ? "saved" : ""}
            />
          )}
        </button>
      </div>
      <div className="card-body">
        <h3 className="car-name" onClick={handleNavigateToCar}>
          {car?.car_name ?? "Car Name"}
        </h3>
        <div className="car-meta">
          <div className="meta-item">
            <span>{car?.model ?? "N/A"}</span>
          </div>
          <div className="meta-item">
            <FaGasPump />
            <span>{car?.fuel_type ?? "N/A"}</span>
          </div>
          <div className="meta-item">
            <FaCogs />
            <span>{car?.transmission ?? "N/A"}</span>
          </div>
        </div>
        <div className="car-meta">
          <div className="meta-item">
            <span>{car?.model ?? "-"}</span>
          </div>
        </div>
        <div className="car-price-info">
          <span className="current-price">
            ₹{car?.price?.toLocaleString() ?? "N/A"}
          </span>
          {car?.original_price && (
            <span className="original-price">
              ₹{car.original_price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
      <div className="card-footer">
        <p className="location">
          <FaMapMarkerAlt /> {car?.place ?? "N/A"}
        </p>
        <div className="views">
          <FaEye />
          <span>{formatViews(car?.views?.toLocaleString())}</span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Card;
