const express = require("express");
const router = express.Router();

// Get a list of all workouts
router.get("/", () => {})

// Create a workout
router.post("/", () => {})

// Update a workout
router.patch("/:id", () => {})

// Delete a workout
router.delete("/:id", () => {})

module.exports = router