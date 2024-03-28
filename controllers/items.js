const Item = require("../models/Item");
const fs = require("fs");
// const upload = require("../middlewares/upload");
// const Photo = require("../models/photo");
// const photo = req.file;

//! controller for posting an item with file upload
const postItem = async (req, res) => {
  const { description, location, contactInfo, status } = req.body;
  // Check if file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Create a new item with file path
    const newItem = await Item.create({
      description: description,
      location: location,
      contactInfo: contactInfo,
      status: status,
      photo: req.file.path, // Store the file path in the 'photo' field
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create item" });
  }
};

//! controller for updating an item with file upload
const updateItem = async (req, res) => {
  const { id: itemID } = req.params;
  const { description, location, contactInfo, status } = req.body;
  let updateFields = {
    description,
    location,
    contactInfo,
    status,
    updatedAt: Date.now(),
  };
  // Check if photo is included in the request
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

//! controller for deleting an item
const deleteItem = async (req, res) => {
  const { id: itemID } = req.params;

  try {
    const item = await Item.findByIdAndDelete(itemID);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    fs.unlinkSync(item.photo); // Delete the photo file from the uploads folder
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete item. Please try again." });
  }
};

const listItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json({ items, nbHits: items.length });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve items. Please try again." });
  }
};

//! controller for retrieving a single item
const singleItem = async (req, res) => {
  const { id: itemID } = req.params;

  try {
    const item = await Item.findById(itemID); // Find item by ID
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ item });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to retrieve item. Please try again." });
  }
};

module.exports = {
  postItem,
  updateItem,
  deleteItem,
  listItems,
  singleItem,
};
