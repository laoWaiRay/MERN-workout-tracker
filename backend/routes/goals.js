const express = require("express");
const router = express.Router();

// Get list of all goals
router.get("/", () => {})

// Get a single goal
router.get("/:id", () => {})

// Create a goal
router.post("/", () => {})

// Update a goal
router.patch("/:id", () => {})

// Delete a goal
router.delete("/:id", () => {})

module.exports = router