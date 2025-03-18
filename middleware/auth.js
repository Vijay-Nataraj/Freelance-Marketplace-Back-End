const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../utils/config");

const auth = {
  checkAuth: (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract the token from Authorization header

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  },

  allowRoles: (roles) => {
    return async (req, res, next) => {
      try {
        const user = req.user;
        if (!user) {
          return res
            .status(401)
            .json({ message: "Unauthorized: User not found" });
        }

        if (!roles.includes(user.role)) {
          return res
            .status(403)
            .json({ message: "Forbidden: You do not have permission" });
        }

        next();
      } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    };
  },
};

module.exports = auth;
