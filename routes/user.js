const express = require("express");
const router = express.Router();
const { login, signUp, signOut } = require("../controllers/user");

// endpoints for signup , login and logout
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/signout").post(signOut);


module.exports = router;
