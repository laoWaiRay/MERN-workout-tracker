// Require dependencies
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const exerciseRoutes = require("./routes/exercises");
const workoutRoutes = require("./routes/workouts");
const goalRoutes = require("./routes/goals");

// Configure dependencies
const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Route handling middleware
app.use("/api/user", userRoutes);
app.use("/api/exercise", exerciseRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/api/goals", goalRoutes);

// Connect to MongoDB Atlas
mongoose.connect(process.env.ATLAS_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    })
  })
  .catch((err) => {
    console.error(err);
  });