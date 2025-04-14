import React, { useEffect, useState } from "react";
import "./SavedCarsScreen.css";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { GET_SAVED_CARS_URL } from "../../config/api";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

const savedCars = [
  {
    id: 1,
    title: "2022 Tesla Model S",
    image:
      "data:image/jpeg;base64,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",
    price: 89990,
    mileage: 15000,
    location: "Los Angeles, CA",
  },
  {
    id: 2,
    title: "2021 Toyota Corolla",
    image:
      "data:image/jpeg;base64,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",
    price: 20000,
    mileage: 25000,
    location: "New York, NY",
  },
  {
    id: 3,
    title: "2020 Ford Mustang",
    image:
      "data:image/jpeg;base64,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",
    price: 35000,
    mileage: 18000,
    location: "Chicago, IL",
  },
];

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
  };

  useEffect(() => {
    const fetchSavedCars = async () => {
      try {
        setLoading(true);
        let favCars = JSON.parse(localStorage.getItem("fav-cars")) || [];
        let { data } = await axios.post(`${GET_SAVED_CARS_URL}`, {
          savedIds: favCars,
        });

        if (data && data.cars && data.cars.length > 0) {
          setLoading(false);
          setSavedCars(data.cars);
        }
      } catch (error) {
        console.log("Error while fetching saved cars : ", error);
        setLoading(false);
      }
    };
    fetchSavedCars();
  }, []);

  const handleDelete = (id) => {
    // setSavedCars(cars.filter((car) => car.id !== id));
  };

  return (
    <div className="saved-cars-container">
      <h1 className="saved-cars-title">Your Saved Vehicles</h1>
      <div className="saved-cars-list">
        {loading ? (
          <Loader />
        ) : savedCars?.length == 0 ? (
          <>No cars available</>
        ) : (
          <>
            {" "}
            {savedCars.map((car) => (
              <div
                key={car.id}
                className={`saved-car-item ${car.featured ? "featured" : ""}`}
              >
                {car.featured && <div className="featured-badge">Featured</div>}
                <div className="car-image-container">
                  <div className="car-image-placeholder">
                    <img
                      src={car?.images[0]}
                      className="w-100"
                      onClick={() => {
                        window.location.href = `/car/${car._id}`;
                      }}
                    />
                  </div>
                </div>
                <div className="car-content">
                  <div className="car-info">
                    <h2 className="car-title">{car?.car_name ?? "_"}</h2>
                    <p className="car-price">${car.price.toLocaleString()}</p>
                    <div className="car-details">
                      <span className="car-mileage">
                        <img src="/mileage-icon.svg" alt="" />{" "}
                        {car.mileage.toLocaleString()} Mileage
                      </span>
                      <span className="car-location">
                        <img src="/location-icon.svg" alt="" />{" "}
                        {car?.place ?? ""}
                      </span>
                    </div>
                  </div>
                  <div className="car-actions">
                    <button className="action-button share-button">
                      <ShareIcon />
                    </button>
                    <button
                      className="action-button delete-button"
                      onClick={() => {
                        removeFromFavorites(car?._id);
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default SavedCarsScreen;
