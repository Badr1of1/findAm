const express = require("express");
const router = express.Router();
const { postItem, updateItem, deleteItem } = require("../controllers/items");
const upload = require("../middlewares/upload");

// Route for posting an item with file upload
router.route("/post-item").post(upload.single("photo"), postItem);

// Route for updating an item with file upload
router.route("/update-item/:id").patch(upload.single("photo"), updateItem);
router.route("/delete-item/:id").delete(deleteItem);

// router.route("/delete-item").delete(deleteItem);

module.exports = router;
