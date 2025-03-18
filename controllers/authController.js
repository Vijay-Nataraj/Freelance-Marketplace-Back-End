const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, NODE_ENV } = require("../utils/config");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const { generateToken } = require("../utils/token");

const authController = {
  register: async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ msg: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
      });

      await newUser.save();
      res
        .status(200)
        .json({ message: "User registered successfully", newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User does not found" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = generateToken(user);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });

      res.status(200).json({
        message: "Login successful",
        token,
        role: user.role,
        freelancerID: user._id,
        email: user.email,
        user,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  forgotPassword: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const token = crypto.randomBytes(32).toString("hex");

      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex"); // Hash the token
      user.resetPasswordToken = hashedToken;

      user.resetPasswordExpires = Date.now() + 30 * 60 * 1000; // 30 minutes

      await user.save();

      // Retrieve the origin
      const origin =
        req.get("origin") || `${req.protocol}://${req.get("host")}`;
      const resetUrl = `${origin}/reset-password/${token}`;

      await sendEmail({
        to: email,
        subject: `Password Reset Request`,
        text: `Click on the link to reset your password: ${resetUrl}`,
      });

      return res
        .status(200)
        .json({ token, message: "Password reset link sent successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  resetPassword: async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    console.log("Received token:", token);
    console.log("Received password:", password);
    try {
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex"); // Hash the token

      const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Password reset token is invalid or has expired" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      res.status(200).json({ message: "Password has been updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      // clear the token from the cookie
      res.clearCookie("token", {
        httpOnly: true,
        secure: NODE_ENV,
        sameSite: "Strict",
      });

      // return a success message
      res.status(200).json({ message: "Logged out successful" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
