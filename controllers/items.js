const Item = require("../models/Item");
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


const updateItem = async (req, res) => {
  const { id } = req.params;
  const { description, location, contactInfo, status } = req.body;
  const photo = req.file;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { description, location, contactInfo, status, photo },
      { new: true }
    );

    res.status(200).json({ updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update item. Please try again." });
  }
};

module.exports = { postItem, updateItem };
