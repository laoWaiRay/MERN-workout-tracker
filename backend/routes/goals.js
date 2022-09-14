const express = require("express");
const router = express.Router();

const goalController = require("../controllers/goalController")
const requireAuth = require("../middleware/requireAuth")

router.use(requireAuth)

// Get list of all goals
router.get("/", goalController.listGoals)

// Get a single goal
router.get("/:id", goalController.detailGoal)

// Create a goal
router.post("/", goalController.createGoal)

// Update a goal
router.patch("/:id", goalController.updateGoal)

// Delete a goal
router.delete("/:id", goalController.deleteGoal)

module.exports = router