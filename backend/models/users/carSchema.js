const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  dealer_id: { type: mongoose.ObjectId, ref: "User", required: true },
  title: { type: String, required: true }, // Example: "2018 Toyota Corolla LE"
  make: { type: String, required: true }, // Example: "Toyota"
  model: { type: String, required: true }, // Example: "Corolla"
  year: { type: Number, required: true }, // Example: 2018
  price: { type: Number, required: true }, // Example: 12000 (in USD or chosen currency)
  mileage: { type: Number, required: true }, // In miles or km
  fuel_type: {
    type: String,
    enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
    required: true,
  },
  transmission: { type: String, enum: ["Manual", "Automatic"], required: true },
  body_type: {
    type: String,
    enum: [
      "Sedan",
      "SUV",
      "Truck",
      "Hatchback",
      "Coupe",
      "Convertible",
      "Van",
      "Other",
    ],
    required: true,
  },
  color: { type: String, required: true }, // Example: "Black"
  condition: {
    type: String,
    enum: ["New", "Used", "Certified"],
    required: true,
  },
  description: { type: String }, // Additional details about the car
  location: { type: String, required: true }, // Example: "Los Angeles, CA"
  images: [{ type: String }], // Array of image URLs
  features: [{ type: String }], // Example: ["Sunroof", "Bluetooth", "Backup Camera"]
  doors: { type: Number, required: true }, // Example: 4
  seats: { type: Number, required: true }, // Example: 5
  drivetrain: { type: String, enum: ["FWD", "RWD", "AWD", "4WD"] }, // Drivetrain type
  engine_size: { type: String }, // Example: "2.0L 4-cylinder"
  vin: { type: String, unique: true }, // Vehicle Identification Number (optional)
  status: {
    type: String,
    enum: ["Available", "Sold", "Pending"],
    default: "Available",
  },
  views: { type: Number, default: 0 }, // Track how many times the car listing is viewed
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Cars = mongoose.model("Cars", CarSchema);
module.exports = Cars;
