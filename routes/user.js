const express = require("express");
const router = express.Router();
const { login, signUp, signOut, getProfile } = require("../controllers/user");

// endpoints for signup , login and logout
router.route("/profile").get(getProfile)
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/signout").post(signOut);


module.exports = router;
