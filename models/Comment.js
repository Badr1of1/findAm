const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    itemID:{
      type: mongoose.Schema.ObjectId,
      ref: "itemSchema",
      required: true
    },
    question:{
      type: String,
      required: true
    },
    answer:{
      type: String,
      required: true
    },
    response:{
      type: String,
      default: "Moderation"
    }
  }
)

const message = mongoose.model("message", messageSchema)
module.exports = message