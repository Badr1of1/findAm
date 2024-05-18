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

// Route for posting an item with file upload
router
  .route("/items")
  .post(upload.single("photo"), postItem)
  .get(listItems);

// Route for updating an item with file upload, deleting an item, and getting a single item. In that order.
router
  .route("/items/:id")
  .get(singleItem)
  .patch(upload.single("photo"), updateItem)
  .delete(deleteItem);

module.exports = router;
