const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const generateToken = (user) => {
  const payload = {
    id: user._id,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

module.exports = { generateToken };
