const express = require("express");
const router = express.Router();
const { addComment, getComments } = require("../controllers/comments");
const { authenticateUser } = require("../middlewares/auth");

// add comment to a post
router.route("/items/:itemId/comments").post(authenticateUser, addComment);

// retrieve comments
router.route("/items/:itemId/comments").get(getComments);

module.exports = router;
