const express = require("express");
const router = express.Router();

// const {
//     authItems,
//     authSingleItem,
//     authDelitem,
//     authUpdate,
//   } = require("../controllers/auth/items");
// const authenticateUser = require("../middlewares/auth");

const { login, signUp, signOut } = require("../controllers/user");

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/login").post(signOut);

// router.route("/user/items").get(authenticateUser, authItems);

// router.route("/user/items:id").get(authenticateUser, authSingleItem).delete(authenticateUser, authDelitem).patch(authenticateUser, authUpdate);

module.exports = router;
