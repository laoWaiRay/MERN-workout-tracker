const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth")
const workoutController = require("../controllers/workoutController");

router.use(requireAuth)

// Get a list of all workouts
router.get("/", workoutController.listWorkouts)

// Get a single workout
router.get("/:id", workoutController.detailWorkout)

// Create a workout
router.post("/", workoutController.createWorkout)

// Update a workout
router.patch("/:id", workoutController.updateWorkout)

// Delete a workout
router.delete("/:id", workoutController.deleteWorkout)

module.exports = router