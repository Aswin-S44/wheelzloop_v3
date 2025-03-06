const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./routes/users/userRouter");

const app = express();

const port = process.env.PORT || 5000;

// Middlewares
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes configurations
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("Nodejs server is running....");
});

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
