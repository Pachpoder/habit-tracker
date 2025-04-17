const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Error Mongo:", err));

// rutas
const habitRoutes = require("../routes/habitRoutes");
const authRoutes = require("../routes/authRoutes");

app.use("/api/habits", habitRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
