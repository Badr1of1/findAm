const Item = require("../models/Item");

const reportLostItem = async (req, res) => {
  const { description, location, contactInfo } = req.body;

  try {
    const newItem = await Item.create({
      description,
      location,
      contactInfo,
      isLost: true,
    });

    res.status(201).json({ newItem });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to report lost item. Please try again." });
  }
};

const findItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { reportLostItem, findItems };
