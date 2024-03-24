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

// const updateItem = async (req, res) => {
//   const { id: itemID } = req.params;
//   const { description, location, contactInfo, status } = req.body;
//   let updateFields = {
//     description,
//     location,
//     contactInfo,
//     status,
//     updatedAt: Date.now(),
//   };

//   // Check if photo is included in the request
//   if (req.file) {
//     // If a new photo is uploaded, update the photo field
//     updateFields.photo = req.file.path;
//   }

//   try {
//     // Find the item by ID
//     const item = await Item.findById(itemID);

//     // Check if item is not found
//     if (!item) {
//       return res.status(404).json({ error: "Item not found" });
//     }

//     // Delete the old photo from the uploads folder if it exists
//     if (req.file.originalname && item.photo.originalname) {
//       fs.unlinkSync(item.photo.originalname); // Delete the old photo file
//     }

//     // Update the item fields in the database
//     const updatedItem = await Item.findByIdAndUpdate(itemID, updateFields, {
//       new: true, // Return the updated item
//       runValidators: true, // Run validation checks on the updated fields
//     });

//     // Send the updated item in the response
//     res.status(200).json({ updatedItem });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to update item. Please try again." });
//   }
// };

module.exports = { postItem, updateItem };
