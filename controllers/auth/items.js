const Item = require("../../models/Item");
const fs = require("fs");

//! Retrieve a list of items posted by the authenticated user.
const authItems = async (req, res) => {
  try {
    //fetch items from the database based on the authenticated user's id
    const items = await Item.find({ user: req.user._id });
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

//!Retrieve details of a specific item posted by the authenticated user.
const authSingleItem = async (req, res) => {
  const { id: itemID } = req.params;
  try {
    const item = await Item.findOne({ _id: itemID, user: req.user._id });
    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

//! Delete an item posted by the authenticated user.
const authDelitem = async (req, res) => {
  const { id: itemID } = req.params;
  try {
    const item = await Item.findByIdAndDelete({
      _id: itemID,
      user: req.user._id,
    });
    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }
    fs.unlink(item.photo);
    res.status(200).json({ msg: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Failed to deleted item. Please try again." });
  }
};

//! Update an item posted by the authenticated user
const authUpdate = async (req, res) => {
  const { id: itemID } = req.params;
  const { description, location, contactInfo, status } = req.body;
  let updateFields = {
    description,
    location,
    contactInfo,
    status,
    updatedAt: Date.now(),
  };
  if (req.file) {
    updateFields.photo = req.file.path;
  }

  try {
    const item = await Item.findOneAndUpdate({ _id: itemID }, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ item });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path); // Delete the uploaded photo file
    }
    console.error(error);
    res.status(500).json({ error: "Failed to update item. Please try again." });
  }
};

module.exports = { authItems, authSingleItem, authDelitem, authUpdate };
