const express = require("express");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

//create a router
const authRouter = express.Router();

//define the routes
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.post("/reset-password/:token", authController.resetPassword);

module.exports = authRouter;
