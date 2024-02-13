const express = require("express");
const router = express.Router();
const { findItems, reportLostItem } = require("../controllers/items");

router.route("/report-lost-item").post(reportLostItem);
router.route("/find-items").get(findItems);

module.exports = router;
