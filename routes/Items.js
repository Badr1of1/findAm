const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  postItem,
  updateItem,
  deleteItem,
  listItems,
  singleItem,
} = require("../controllers/items");
const { authenticateUser } = require("../middlewares/auth");

// endpoint for retrieving all items, and posting an item
router
  .route("/items")
  .get(authenticateUser, listItems)
  .post(authenticateUser, upload.single("photo"), postItem);

// get a single item, update an item, delete an item
router
  .route("/items/:id")
  .get(authenticateUser, singleItem)
  .patch(authenticateUser, upload.single("photo"), updateItem)
  .delete(authenticateUser, deleteItem);

module.exports = router;
