const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// signup
router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);

// login
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);

// logout
router.get("/logout", authController.logout_get);

module.exports = router;
