const Item = require("../models/Item");
const fs = require("fs");

const postItem = async (req, res) => {
  const { description, location, contactInfo, status } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const newItem = await Item.create({
      user: req.user._id,
      description,
      location,
      contactInfo,
      status,
      photo: req.file.path,
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to create item ${error.message}` });
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
      fs.unlinkSync(req.file.path);
    }
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

    fs.unlinkSync(item.photo);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete item. Please try again." });
  }
};

const listItems = async (req, res) => {
  try {
    const items = await Item.find({});
    const itemsWithUrls = items.map(item => ({
      ...item._doc,
      photoUrl: `${req.protocol}://${req.get('host')}/${item.photo}`
    }));
    res.status(200).json({ items: itemsWithUrls, nbHits: items.length });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve items. Please try again." });
  }
};

const getUserItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.username });
    res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve user items. Please try again.' });
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
