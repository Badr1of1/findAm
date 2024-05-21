const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ msg: "Unauthorized: No token provided or invalid format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ msg: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ msg: `Unauthorized: ${error.message}` });
    } else {
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
};

module.exports = { authenticateUser };
