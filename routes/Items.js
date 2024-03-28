const express = require("express");
const router = express.Router();
const {
  postItem,
  updateItem,
  deleteItem,
  listItems,
  singleItem,
} = require("../controllers/items");
const upload = require("../middlewares/upload");

// Route for posting an item with file upload
router.route("/items").post(upload.single("photo"), postItem).get(listItems);

// Route for updating an item with file upload, deleting an item, and getting a single item. In that order.
router
  .route("/items/:id")
  .patch(upload.single("photo"), updateItem)
  .delete(deleteItem)
  .get(singleItem);

///// todo: GET /items: Retrieve a list of all items (lost and found).
/////todo: GET /items/:id: Retrieve details of a specific item by its ID.
/////todo: POST /items: Create a new item (report lost/found).
/////todo: PUT /items/:id: Update an existing item (e.g., update description, location, contact info, status, or photo).
/////todo: DELETE /items/:id: Delete an existing item by its ID.
//todo: GET /user/items: Retrieve a list of items posted by the authenticated user.
//todo GET /user/items/:id: Retrieve details of a specific item posted by the authenticated user.
//todo: PUT /user/items/:id: Update an item posted by the authenticated user.
//todo: DELETE /user/items/:id: Delete an item posted by the authenticated user.

module.exports = router;
