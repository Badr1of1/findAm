// const mongoose = require("mongoose");

// const itemSchema = new mongoose.Schema({
//   description: { type: String, required: true },
//   location: { type: String, required: true },
//   date: { type: Date, default: Date.now },
//   isLost: { type: Boolean, required: true },
//   contactInfo: { type: String, required: true },
// });

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: [true, "provide your name please"] },
//   email: { type: String, required: true },
// });

// const Item = mongoose.model("Item", itemSchema);
// const User = mongoose.model("User", userSchema);

// module.exports = { Item, User };

const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["lost", "found"],
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
