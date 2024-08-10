const Item = require("../models/Item");
const fs = require("fs");
const { uploadToS3 } = require("../middlewares/upload");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const postItem = async (req, res) => {
  const { itemName, description, location, contactInfo, status } = req.body;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const itemPictures = await Promise.all(
      req.files.map(async (file) => {
        const fileUrl = await uploadToS3(file);
        return fileUrl; // Return the URL directly
      })
    );

    const newItem = await Item.create({
      user: req.user._id,
      itemName,
      description,
      location,
      contactInfo,
      status,
      itemPictures,
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to create item ${error.message}` });
  }
};

const updateItem = async (req, res) => {
  const { id: itemID } = req.params;
  const { itemName, description, location, contactInfo, status } = req.body;
  let updateFields = {
    itemName,
    description,
    location,
    contactInfo,
    status,
    updatedAt: Date.now(),
  };

  if (req.files && req.files.length > 0) {
    const itemPictures = req.files.map((file) => ({ img: file.location }));
    updateFields.itemPictures = itemPictures;
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
    // if (req.file) {
    //   fs.unlinkSync(req.file.path);
    // }
    console.error(error);
    res.status(500).json({ error: "Failed to update item. Please try again." });
  }
};

const deleteItem = async (req, res) => {
  const { id: itemID } = req.params;

  try {
    const item = await Item.findByIdAndDelete(itemID);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // delete from s3
    if (itemPictures && itemPictures.length > 0) {
      const deleteParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Delete: {
          Objects: item.itemPictures.map((picture) => ({
            Key: picture.img.split("/").pop(),
          })),
          Quiet: false,
        },
      };
      await s3.deleteObjects(deleteParams).promise();
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete item. Please try again." });
  }
};

// const listItems = async (req, res) => {
//   try {
//     const items = await Item.find({});
//     const itemsWithUrls = items.map((item) => ({
//       ...item._doc,
//       photoUrl: item.photo, // assuming `item.photo` contains the S3 URL
//     }));
//     res.status(200).json({ items: itemsWithUrls, nbHits: items.length });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to retrieve items. Please try again." });
//   }
// };
 const listItems = async (req, res) => { 
    const items = await Item.find({})
    for(item of items){
      const getObjectParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: item.itemPictures
      }
      const command = new GetObjectCommand(getObjectParams)
    }
  }

const getUserItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user._id });
    const itemsWithUrls = items.map((item) => ({
      ...item._doc,
      photoUrl: `${req.protocol}://${req.get("host")}/${item.photo}`,
    }));
    res.status(200).json({ items: itemsWithUrls, nbHits: items.length });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to retrieve user items. Please try again." });
  }
};

const singleItem = async (req, res) => {
  const { id: itemID } = req.params;

  try {
    const item = await Item.findById(itemID);

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
  getUserItems,
};
