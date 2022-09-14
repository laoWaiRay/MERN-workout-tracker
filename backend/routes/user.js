const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

// Log in route
router.post("/login", userController.loginUser)

// Sign up route
router.post("/signup", userController.signupUser)

// Require auth
router.use(requireAuth)

// Delete account route
router.delete("/:id", userController.deleteUser)

module.exports = router