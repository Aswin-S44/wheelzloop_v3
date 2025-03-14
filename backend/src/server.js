const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/users/userRouter");
const db = require("../config/db");
const { rateLimiter } = require("../middlewares/rateLimiter");
const rateLimit = require("express-rate-limit");
const app = express();

const port = process.env.PORT || 5000;

// Database connection
db.connect();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // Limit each IP to 100 requests
  message: "Too many requests from this IP, please try again after 15 minutes",
});

// Middlewares
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);
app.use(rateLimiter);

// Routes configurations
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("Nodejs server is running....");
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
