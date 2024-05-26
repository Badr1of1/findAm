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

// Route for posting an item with file upload,
// and retrieving them
router
  .route("/items")
  .post(authenticateUser, upload.single("photo"), postItem)
  .get(authenticateUser, listItems);

// get a single item, update an item, delete an item
router
  .route("/items/:id")
  .get(authenticateUser, singleItem)
  .patch(authenticateUser, upload.single("photo"), updateItem)
  .delete(authenticateUser, deleteItem);

module.exports = router;
