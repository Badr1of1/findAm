const User = require("../models/User");

const signUp = async (req, res) => {
  try {
    const user = req.body;
    const newUser = await User.create(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to sign up. Please try again" });
  }
};

module.exports = { signUp };
