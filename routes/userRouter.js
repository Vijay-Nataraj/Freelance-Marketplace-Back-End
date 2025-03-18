const express = require("express");
const auth = require("../middleware/auth");
const authController = require("../controllers/authController");
const userRouter = express.Router();

userRouter.get(
  "/freelancer-dashboard",
  auth.checkAuth,
  auth.allowRoles(["freelancer"]),
  (req, res) => {
    res.status(200).json({ message: "Welcome to the Freelancer Dashboard!" });
  }
);

userRouter.get(
  "/client-dashboard",
  auth.checkAuth,
  auth.allowRoles(["client"]),
  (req, res) => {
    res.status(200).json({ message: "Welcome to the Client Dashboard!" });
  }
);

userRouter.get("/logout", authController.logout);

module.exports = userRouter;
