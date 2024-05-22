const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a user name"],
  },

  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },

  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const commentSchema = new Schema({
  postID: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});

const Comment = mongoose.model("Comment", commentSchema);
const User = mongoose.model("User", userSchema);

module.exports = { User, Comment };
