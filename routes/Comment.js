const express = require("express");
const router = express.Router();
const { addComment, getComments } = require("../controllers/comments");
const { authenticateUser } = require("../middlewares/auth");

router.route("/items/:itemId/comments").post(authenticateUser, addComment);

router.route("/items/:itemId/comments").get(getComments);

module.exports = router;
