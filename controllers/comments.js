const Comment = require("../models/Comment");
const Item = require("../models/Item");

const addComment = async (req, res) => {
  const { itemId } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ msg: "Cannot post an empty comment" });
  }

  try {
    const comment = await Comment.create({
      itemId,
      userId: req.user.id,
      content,
    });
    //update post with comment
    await Item.findByIdAndUpdate(itemId, { $push: { comments: comment._id } });
    res.status(201).json({ msg: "Comment added", comment });
  } catch (error) {
    res.status(500).json({ msg: `Internal server error: ${error.message}` });
  }
};

const getComments = async (req, res) => {
  const { itemId } = req.params;

  try {
    const comments = await Comment.find({ itemId }).populate(
      "userId",
      "username"
    );

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
};

module.exports = {
  addComment,
  getComments,
};
