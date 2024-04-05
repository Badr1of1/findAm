const User = require("../models/User");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Please fill out the necessary fields" });
    }

    const existingUsername = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUsername) {
      return res.status(400).json({ msg: "Username already exists" });
    }
    if (existingEmail) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ msg: "User created successfully", newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { signUp };
