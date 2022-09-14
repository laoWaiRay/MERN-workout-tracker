const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const exerciseController = require("../controllers/exerciseController");

router.use(requireAuth)

// Get list of all exercises
router.get("/", exerciseController.listExercises)

// Create a new exercise
router.post("/", exerciseController.createExercise)

// Update a single exercise
router.patch("/:id", exerciseController.updateExercise)

// Delete a single exercise
router.delete("/:id", exerciseController.deleteExercise)

module.exports = router

