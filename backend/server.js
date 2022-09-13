// Require dependencies
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Configure dependencies
const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Route handling middleware


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