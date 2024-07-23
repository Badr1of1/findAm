const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  postItem,
  updateItem,
  deleteItem,
  listItems,
  singleItem,
  getUserItems,
} = require("../controllers/items");
const { authenticateUser } = require("../middlewares/auth");

// endpoint for retrieving all items, and posting an item
router
  .route("/items")
  .get(listItems)
  .post(authenticateUser, upload.array("files", 10), postItem);

// get a single item, update an item, delete an item
router
  .route("/items/:id")
  .get(authenticateUser, singleItem)
  .patch(authenticateUser, upload.array("files", 10), updateItem)
  .delete(authenticateUser, deleteItem);

router.route("/user/items").get(authenticateUser, getUserItems);

module.exports = router;
