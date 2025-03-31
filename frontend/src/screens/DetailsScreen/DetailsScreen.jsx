import React, { useEffect, useState } from "react";
import "./DetailsScreen.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CAR_DETAILS_API } from "../../config/api";
import Loader from "../../components/Loader/Loader";

// const car = {
//   dealer_id: "12345",
//   title: "2022 Tesla Model S",
//   make: "Tesla",
//   model: "Model S",
//   year: 2022,
//   price: 89990,
//   mileage: 15000,
//   fuel_type: "Electric",
//   transmission: "Automatic",
//   body_type: "Sedan",
//   color: "Midnight Silver",
//   condition: "Used",
//   description:
//     "This 2022 Tesla Model S is in excellent condition with low mileage. It features a sleek design, advanced autopilot capabilities, and a luxurious interior. Perfect for those who want a high-performance electric vehicle.",
//   location: "Los Angeles, CA",
//   images: [
//     "data:image/jpeg;base64,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",
//     "data:image/jpeg;base64,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",
//   ],
//   features: [
//     "Autopilot",
//     "Sunroof",
//     "Heated Seats",
//     "Premium Sound System",
//     "Wireless Charging",
//   ],
//   doors: 4,
//   seats: 5,
//   drivetrain: "AWD",
//   engine_size: "Dual Motor",
//   vin: "5YJSA1E21MF123456",
//   status: "Available",
//   views: 120,
//   created_at: "2023-01-15T00:00:00.000Z",
//   updated_at: "2023-10-01T00:00:00.000Z",
// };

function DetailsScreen() {
  const { id } = useParams();
  console.log("ID---------", id);

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      const url = `${CAR_DETAILS_API}/${id}`;
      console.log("url--------", url);
      const res = await axios.get(url);
      setLoading(false);
      if (res && res.data) {
        setCar(res.data.data);
      }
    };
    fetchCar();
  }, []);

  return (
    <div className="details-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Image Gallery */}
          <div className="image-gallery">
            <div className="main-image">
              <img src={car?.images[0]} alt="Main Car" />
            </div>
            <div className="thumbnail-images">
              {car?.images.map((image, index) => (
                <img key={index} src={image} alt={`Car ${index + 1}`} />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="product-details">
            <h1 className="product-title">{car?.title}</h1>
            <p className="product-price">${car?.price.toLocaleString()}</p>

            {/* Highlights */}
            <div className="product-highlights">
              <div className="highlight-item">
                <span>Mileage</span>
                <span>{car?.mileage?.toLocaleString()} miles</span>
              </div>
              <div className="highlight-item">
                <span>Fuel Type</span>
                <span>{car?.fuel_type}</span>
              </div>
              <div className="highlight-item">
                <span>Transmission</span>
                <span>{car?.transmission}</span>
              </div>
              <div className="highlight-item">
                <span>Condition</span>
                <span>{car?.condition}</span>
              </div>
            </div>

            {/* Description */}
            <div className="product-description">
              <h2>Description</h2>
              <p>{car?.description}</p>
            </div>

            {/* Specifications */}
            <div className="product-specs">
              <h2>Specifications</h2>
              <div className="specs-grid">
                <div className="spec-item">
                  <span>Make</span>
                  <span>{car?.make}</span>
                </div>
                <div className="spec-item">
                  <span>Model</span>
                  <span>{car?.model}</span>
                </div>
                <div className="spec-item">
                  <span>Year</span>
                  <span>{car?.year}</span>
                </div>
                <div className="spec-item">
                  <span>Body Type</span>
                  <span>{car?.body_type}</span>
                </div>
                <div className="spec-item">
                  <span>Color</span>
                  <span>{car?.color}</span>
                </div>
                <div className="spec-item">
                  <span>Doors</span>
                  <span>{car?.doors}</span>
                </div>
                <div className="spec-item">
                  <span>Seats</span>
                  <span>{car?.seats}</span>
                </div>
                <div className="spec-item">
                  <span>Drivetrain</span>
                  <span>{car?.drivetrain}</span>
                </div>
                <div className="spec-item">
                  <span>Engine Size</span>
                  <span>{car?.engine_size}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="product-features">
              <h2>Features</h2>
              <ul>
                {car?.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Contact Button */}
            <button className="contact-button">Contact Seller</button>
          </div>
        </>
      )}
    </div>
  );
}

export default DetailsScreen;
