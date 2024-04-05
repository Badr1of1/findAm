const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d", // Token expires in 30 days
      }
    );

    // Set the JWT token as a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days expiration
    });

    res
      .status(200)
      .json({ message: "Login successful", user: { username: user.username } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//!  Retrieve the profile of the authenticated user.
const getProfile = async (req, res) => {
  try {
    const userID = req.user._id;
    const userProfile = User.findById({ userID });
    if (!userProfile) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(2001).json({ userProfile });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Failed to get user's profile. Please try again." });
  }
};

module.exports = { login, getProfile };
