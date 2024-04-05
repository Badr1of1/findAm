const express = require("express");
const router = express.Router();
const {
  postItem,
  updateItem,
  deleteItem,
  listItems,
  singleItem,
} = require("../controllers/items");

// const {
//   authItems,
//   authSingleItem,
//   authDelitem,
//   authUpdate,
// } = require("../controllers/auth/items");

const upload = require("../middlewares/upload");
// const authenticateUser = require("../middlewares/auth");

// Route for posting an item with file upload
router.route("/items").post(upload.single("photo"), postItem).get(listItems);

// Route for updating an item with file upload, deleting an item, and getting a single item. In that order.
router
  .route("/items/:id")
  .patch(upload.single("photo"), updateItem)
  .delete(deleteItem)
  .get(singleItem);

// router.route("/user/items").get(authenticateUser, authItems);

// router.route("/user/items:id").get(authenticateUser, authSingleItem).delete(authenticateUser, authDelitem).patch(authenticateUser, authUpdate);

module.exports = router;
