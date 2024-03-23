const express = require("express");
const router = express.Router();
const { postItem, uploadPhoto } = require("../controllers/items");
const upload = require('../middlewares/upload')


// Route for posting an item with file upload
router.post("/post-item", upload.single('photo'), postItem);


// router.route("/update-item").put(updateItem);
// router.route("/delete-item").delete(deleteItem);


module.exports = router;
