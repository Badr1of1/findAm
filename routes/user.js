const express = require("express");
const router = express.Router();

const { login, signUp, signOut } = require("../controllers/user");

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/login").post(signOut);


module.exports = router;
