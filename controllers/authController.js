const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = require("../utils/config");

const authController = {
  register: async (req, res) => {
    try {
      console.log(req.body);

      // get the user input
      const { name, email, password, role } = req.body;

      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create a new user object
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });

      //save the user
      await newUser.save();

      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      console.log(req.body);

      // get the email, password from the req.body
      const { email, password } = req.body;

      // check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "Invalid credentials" });
      }

      //compare if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      //generate token
      const token = await jwt.sign(
        {
          userId: user._id,
          role: user.role,
        },
        JWT_SECRET,
        {
          expiresIn: "3h",
        }
      );

      console.log(token);

      //send the token to the http only cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: NODE_ENV,
        sameSite: "Strict",
      });

      res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
